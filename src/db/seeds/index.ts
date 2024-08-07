import { eq } from 'drizzle-orm';
import db from '../index';
import { family, item, itemImage, itemType, users } from '../schema';
import { itemTypes } from './item-type';
import { items } from './item';

const defaultUserEmail = 'uguremirmustafa@gmail.com';

const main = async () => {
  await db.delete(itemImage);
  await db.delete(item);
  await db.delete(itemType);
  await db.insert(itemType).values(itemTypes);
  await db.insert(family).values({ name: "Ugur's family", description: 'My lovely family' });

  const userData = await db.select().from(users).where(eq(users.email, defaultUserEmail));
  if (userData && userData.length === 1) {
    const user = userData[0];
    await db
      .insert(item)
      .values(items.map((x) => ({ ...x, ownerID: user.id, familyID: user.familyId })));
  }
};

main();
