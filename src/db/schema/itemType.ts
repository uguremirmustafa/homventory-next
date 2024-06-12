import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { sharedTimeColumns } from './common';

const itemType = pgTable('item_type', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('name', { length: 511 }).notNull(),
  icon: varchar('icon_class', { length: 255 }).notNull().unique(),
  ...sharedTimeColumns,
});

export default itemType;
