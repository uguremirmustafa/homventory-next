'use server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { auth } from '@/auth';
import { errors } from '@/lib/error';
import { errorJson, successJson } from '@/lib/response';
import { itemFormSchema, ItemFormValues } from './schema';
import db from '@/db';
import { item, itemImage } from '@/db/schema';
import { revalidatePath } from 'next/cache';

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const BASE_URL = process.env.BASE_URL || 'http://localhost:3002';

export async function uploadImageAction(buffer: Uint8Array) {
  const session = await auth();
  if (!session?.user) {
    return errorJson({ message: errors.unauthorized });
  }

  if (buffer.length > MAX_FILE_SIZE) {
    return errorJson({ message: 'File size exceeds the 1MB limit.' });
  }

  const uniqueFileName = `${crypto.randomBytes(16).toString('hex')}.png`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  const filePath = path.join(uploadDir, uniqueFileName);
  try {
    await fs.mkdir(uploadDir, { recursive: true });
    const nodeBuffer = Buffer.from(buffer);

    await fs.writeFile(filePath, nodeBuffer);

    const fileUrl = `${BASE_URL}/uploads/${uniqueFileName}`;

    return successJson({ message: 'Image uploaded successfully!', data: fileUrl });
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
