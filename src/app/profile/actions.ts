'use server';

import db from '@/db';
import { family, familyInvitation, users } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { errors } from '@/lib/error';
import { familyFormSchema, FamilyFormValues, FamilyJoinFormValues } from './schema';
import { errorJson, successJson } from '@/lib/response';
import { and, eq, gte, sql } from 'drizzle-orm';

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
function generateCode() {
  return Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000);
}
export async function createFamilyInviteCode() {
  const session = await auth();
  if (!session?.user) {
    return errorJson({ message: errors.unauthorized });
  }
  if (!session.user.familyId) {
    return errorJson({ message: 'Family not found' });
  }
  const { user } = session;
  try {
    const code = await db.transaction(async (tx) => {
      await tx
        .update(familyInvitation)
        .set({ validUntil: new Date().toUTCString() })
        .where(
          and(
            eq(familyInvitation.familyID, user.familyId ?? 0),
            eq(familyInvitation.inviterID, user.id)
          )
        );
      const res = await tx
        .insert(familyInvitation)
        .values({
          familyID: user.familyId,
          inviterID: user.id,
          code: generateCode(),
        })
        .returning({ code: familyInvitation.code });

      if (!res || res.length !== 1) {
        tx.rollback();
        return;
      }

      const code = res[0].code;

      return code;
    });

    if (!code) {
      return errorJson({ message: 'Failed to create invitation code' });
    }
    return successJson({ message: 'Successfully joined to the family', data: code });
  } catch (error) {
    return errorJson({ message: 'Failed to create invitation code' });
  }
}
export async function joinFamilyAction(values: FamilyJoinFormValues) {
  const session = await auth();
  if (!session?.user) {
    return errorJson({ message: errors.unauthorized });
  }
  console.log({ values });
  const { user } = session;
  try {
    const familyItem = await db.transaction(async (tx) => {
      const rows = await tx
        .select({ familyName: family.name, familyID: family.id })
        .from(familyInvitation)
        .innerJoin(family, eq(familyInvitation.familyID, family.id))
        .where(
          and(
            eq(familyInvitation.code, values.code),
            gte(familyInvitation.validUntil, new Date().toUTCString())
          )
        );

      if (!rows || rows.length !== 1) {
        tx.rollback();
        return;
      }
      const { familyID } = rows[0];
      if (familyID) {
        await tx.update(users).set({ familyId: familyID }).where(eq(users.id, user.id));
      }
      return rows[0];
    });
    revalidatePath('/profile');
    return successJson({ message: 'Successfully joined to the family', data: familyItem });
  } catch (error) {
    return errorJson({ message: 'Failed to join the family' });
  }
}
