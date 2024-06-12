import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { sharedTimeColumns } from './common';
import { users } from './user';
import family from './family';
import itemType from './itemType';

const item = pgTable('item', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('name', { length: 511 }).notNull(),
  ownerID: text('owner_id').references(() => users.id),
  familyID: integer('family_id').references(() => family.id),
  itemTypeID: integer('item_type_id').references(() => itemType.id),
  ...sharedTimeColumns,
});

export default item;
