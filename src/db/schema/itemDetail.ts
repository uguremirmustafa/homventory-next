import { date, integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { sharedTimeColumns } from './common';
import item from './item';

const itemDetail = pgTable('item_detail', {
  id: serial('id').primaryKey(),
  itemId: integer('item_id').references(() => item.id),
  price: integer('price'),
  gatheringDate: date('gathering_date'),
  lastUsedDate: date('last_used_date'),
  brandName: varchar('brand_name', { length: 255 }),
  gatheringReason: varchar('gathering_reason', { enum: ['buy', 'gift'] }),
  url: text('url'),
  ...sharedTimeColumns,
});

export default itemDetail;
