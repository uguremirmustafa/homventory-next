import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { sharedTimeColumns } from './common';
import item from './item';

const itemImage = pgTable('item_image', {
  id: serial('id').primaryKey(),
  itemId: integer('item_id').references(() => item.id),
  url: varchar('url').notNull(),
  ...sharedTimeColumns,
});

export default itemImage;
