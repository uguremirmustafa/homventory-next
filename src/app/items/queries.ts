import db from '@/db';
import { item, itemType } from '@/db/schema';
import { and, eq, isNull } from 'drizzle-orm';

export async function getItemTypes() {
  return db
    .select({
      name: itemType.name,
      description: itemType.description,
      icon: itemType.icon,
      id: itemType.id,
    })
    .from(itemType)
    .where(isNull(itemType.deletedAt));
}

export type ItemType = Awaited<ReturnType<typeof getItemTypes>>[number];

interface GetItemsInTypeParams {
  itemTypeId: number;
  familyId: number;
}

export async function getItemsInType(params: GetItemsInTypeParams) {
  return db
    .select()
    .from(item)
    .where(
      and(
        eq(item.familyID, params.familyId),
        eq(item.itemTypeID, params.itemTypeId),
        isNull(item.deletedAt)
      )
    );
}

export type Item = Awaited<ReturnType<typeof getItemsInType>>[number];
