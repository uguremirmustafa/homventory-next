'use server';

import db from '@/db';
import { family, users } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { errors } from '@/lib/error';
import { z } from 'zod';
import { familyFormSchema, FamilyFormValues } from './schema';
import { errorJson, successJson } from '@/lib/response';
import { eq } from 'drizzle-orm';

export async function createFamilyAndConnectToUserAction(values: FamilyFormValues) {
  const session = await auth();
  if (!session?.user) {
    return errorJson({ message: errors.unauthorized });
  }

  const parse = familyFormSchema.safeParse(values);

  if (!parse.success) {
    return errorJson({ message: 'Failed to create family' });
  }

  const data = parse.data;

  if (session.user.familyId) {
    return errorJson({ message: 'You already have a family' });
  }

  try {
    const newFamilyID = await db.transaction(async (tx) => {
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
      await tx
        .update(users)
        .set({ familyId })
        .where(eq(users.email, session.user.email ?? ''));
      return familyId;
    });
    revalidatePath('/profile');
    return successJson({ message: `Created family: ${data.name}`, data: newFamilyID });
  } catch (e) {
    return errorJson({ message: 'Failed to create family' });
  }
}

export async function updateFamilyAction(values: FamilyFormValues) {
  const session = await auth();
  if (!session?.user) {
    return errorJson({ message: errors.unauthorized });
  }
  const parse = familyFormSchema.safeParse(values);
  if (!parse.success) {
    return errorJson({ message: 'Failed to create family' });
  }
  if (!session.user.familyId) {
    return errorJson({ message: 'Family not found' });
  }
  const { description, name } = parse.data;
  try {
    await db.update(family).set({ name, description }).where(eq(family.id, session.user.familyId));
    revalidatePath('/profile');
    return successJson({ message: `Updated family: ${name}` });
  } catch (error) {
    return errorJson({ message: 'Failed to update family' });
  }
}
