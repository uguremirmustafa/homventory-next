'use server';

import { auth } from '@/auth';
import { errors } from '@/lib/error';
import { errorJson, successJson } from '@/lib/response';
import { ItemDetailFormValues } from '../schema';
import db from '@/db';
import { revalidatePath } from 'next/cache';
import { itemDetail } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function saveItemDetailAction(itemId: number, form: ItemDetailFormValues) {
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
    await db.transaction(async (tx) => {
      const itemDetails = await tx.select().from(itemDetail).where(eq(itemDetail.itemId, itemId));
      if (itemDetails.length > 1) {
        tx.rollback();
        return;
      }
      const body = {
        price: form.price,
        gatheringDate: form.gatheringDate?.toDateString(),
        url: form.url,
        brandName: form.brandName,
      };
      if (itemDetails.length === 1) {
        await tx.update(itemDetail).set(body).where(eq(itemDetail.id, itemDetails[0].id));
      } else {
        await tx.insert(itemDetail).values({ itemId, ...body });
      }
    });
    revalidatePath(`/item/${itemId}/base`);
    return successJson({ message: 'Saved item details' });
  } catch (error) {
    console.log({ error });
    return errorJson({ message: 'Failed to save item details...' });
  }
}
