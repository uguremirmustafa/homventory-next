'use server';

import db from '@/db';
import { family, users } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { errors } from '@/lib/error';
import { z } from 'zod';
import { familyFormSchema } from './schema';

export async function createFamilyAction(values: z.infer<typeof familyFormSchema>) {
  const session = await auth();
  if (!session?.user) {
    return errors.unauthorized;
  }

  const parse = familyFormSchema.safeParse(values);

  if (!parse.success) {
    return { message: 'Failed to create family!' };
  }

  const data = parse.data;

  try {
    await db.transaction(async (tx) => {
      const newFamilies = await tx
        .insert(family)
        .values({
          name: data.name,
          description: data.description,
        })
        .returning({ id: family.id });

      if (!newFamilies || newFamilies.length !== 1) {
        tx.rollback();
        return;
      }
      const familyId = newFamilies[0].id;
      await tx.update(users).set({ familyId });
    });

    revalidatePath('/profile');
    return { message: `Created family: ${data.name}` };
  } catch (e) {
    return { message: 'Failed to create family' };
  }
}
