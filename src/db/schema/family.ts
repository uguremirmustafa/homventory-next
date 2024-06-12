import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { sharedTimeColumns } from './common';

const family = pgTable('family', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description'),
  ...sharedTimeColumns,
});

export default family;
