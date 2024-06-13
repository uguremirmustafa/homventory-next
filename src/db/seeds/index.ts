import db from '../index';
import { family, itemType } from '../schema';
import { itemTypes } from './item-type';

const main = async () => {
  await db.delete(itemType);
  await db.insert(itemType).values(itemTypes);
  await db.insert(family).values({ name: "Ugur's family", description: 'My lovely family' });
};

main();
