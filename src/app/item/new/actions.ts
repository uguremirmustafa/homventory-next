'use server';
import crypto from 'crypto';
import { auth } from '@/auth';
import { errors } from '@/lib/error';
import { errorJson, successJson } from '@/lib/response';
import { itemFormSchema, ItemFormValues } from './schema';
import db from '@/db';
import { item, itemImage } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { put } from '@vercel/blob';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 1MB

export async function uploadImageAction(buffer: Uint8Array) {
  const session = await auth();
  if (!session?.user) {
    return errorJson({ message: errors.unauthorized });
  }

  if (buffer.length > MAX_FILE_SIZE) {
    return errorJson({ message: 'File size exceeds the 4MB limit.' });
  }

  const uniqueFileName = `${crypto.randomBytes(16).toString('hex')}.png`;
  try {
    const nodeBuffer = Buffer.from(buffer);
    const blob = await put(uniqueFileName, nodeBuffer, {
      access: 'public',
    });
    return successJson({ message: 'Image uploaded successfully!', data: blob.url });
  } catch (err) {
    console.error(err);
    return errorJson({ message: 'Failed to upload image.' });
  }
}

export async function createItemAction(form: ItemFormValues) {
  const session = await auth();
  if (!session?.user) {
    return errorJson({ message: errors.unauthorized });
  }

  if (!session.user.familyId) {
    return errorJson({
      message: 'You do not have family, create your family first in profile page!',
    });
  }

  const parse = itemFormSchema.safeParse(form);

  if (!parse.success) {
    return errorJson({ message: 'Failed to create item' });
  }

  const data = parse.data;

  try {
    const newItemId = await db.transaction(async (tx) => {
      const newItems = await tx
        .insert(item)
        .values({
          name: data.name,
          description: data.description,
          familyID: session.user.familyId,
          ownerID: session.user.id,
          itemTypeID: Number(data.itemTypeId),
        })
        .returning({ id: item.id });

      if (!newItems || newItems.length !== 1) {
        tx.rollback();
        return;
      }

      const itemId = newItems[0].id;
      await tx.insert(itemImage).values({ url: data.image, itemId });
      return itemId;
    });
    revalidatePath(`/items/${data.itemTypeId}`);
    return successJson({
      message: `Created a new item: ${data.name}`,
      data: { id: newItemId, itemTypeId: data.itemTypeId },
    });
  } catch (error) {
    console.error(error);
    return errorJson({ message: 'Failed to create item.' });
  }
}

export async function updateItemAction(form: ItemFormValues, id: number) {
  const session = await auth();
  if (!session?.user) {
    return errorJson({ message: errors.unauthorized });
  }

  if (!session.user.familyId) {
    return errorJson({
      message: 'You do not have family, create your family first in profile page!',
    });
  }

  const parse = itemFormSchema.safeParse(form);

  if (!parse.success) {
    return errorJson({ message: 'Failed to update item' });
  }

  const data = parse.data;

  try {
    const updatedItemId = await db.transaction(async (tx) => {
      const updatedIds = await tx
        .update(item)
        .set({
          name: data.name,
          description: data.description,
          familyID: session.user.familyId,
          ownerID: session.user.id,
          itemTypeID: Number(data.itemTypeId),
        })
        .where(eq(item.id, id))
        .returning({ id: item.id });

      if (!updatedIds || updatedIds.length !== 1) {
        tx.rollback();
        return;
      }

      const itemId = updatedIds[0].id;
      await tx.delete(itemImage).where(eq(itemImage.itemId, id));
      await tx.insert(itemImage).values({ url: data.image, itemId });
      return itemId;
    });
    revalidatePath(`/items/${data.itemTypeId}`);
    return successJson({
      message: `Updated item: ${data.name}`,
      data: { id: updatedItemId, itemTypeId: data.itemTypeId },
    });
  } catch (error) {
    console.error(error);
    return errorJson({ message: 'Failed to update item.' });
  }
}

export async function deleteItemAction(id: number) {
  const session = await auth();
  if (!session?.user) {
    return errorJson({ message: errors.unauthorized });
  }

  if (!session.user.familyId) {
    return errorJson({
      message: 'You do not have family, create your family first in profile page!',
    });
  }

  try {
    const deletedItem = await db.transaction(async (tx) => {
      const updatedIds = await tx
        .update(item)
        .set({
          deletedAt: new Date().toUTCString(),
        })
        .where(eq(item.id, id))
        .returning({ id: item.id, itemTypeId: item.itemTypeID });

      if (!updatedIds || updatedIds.length !== 1) {
        tx.rollback();
        return;
      }
      return updatedIds[0];
    });
    if (deletedItem) {
      revalidatePath(`/items/${deletedItem?.itemTypeId}`);
      return successJson({
        message: `Deleted item: ${deletedItem?.id}`,
        data: deletedItem,
      });
    } else {
      return errorJson({ message: 'Deleted item not found' });
    }
  } catch (error) {
    return errorJson({ message: 'Failed to delete item' });
  }
}
