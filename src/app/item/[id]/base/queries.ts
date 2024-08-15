import db from '@/db';
import { item, itemDetail, itemImage, itemType, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getItemWithDetails(itemId: number) {
  const items = await db
    .select({
      id: item.id,
      name: item.name,
      description: item.description,
      url: itemImage.url,
      typeId: item.itemTypeID,
      typeName: itemType.name,
      typeIcon: itemType.icon,
      owner: users.name,
      ownerAvatar: users.image,
      createdAt: item.createdAt,
    })
    .from(item)
    .innerJoin(itemImage, eq(itemImage.itemId, item.id))
    .innerJoin(itemType, eq(itemType.id, item.itemTypeID))
    .innerJoin(users, eq(users.id, item.ownerID))
    .where(eq(item.id, itemId));
  if (items.length !== 1) {
    return null;
  }
  return items[0];
}

export async function getItemDetails(itemId: number) {
  const itemDetails = await db.select().from(itemDetail).where(eq(itemDetail.itemId, itemId));
  if (itemDetails.length !== 1) {
    return null;
  }
  return itemDetails[0];
}

export type ItemDetail = ReturnType<typeof getItemDetails>;
