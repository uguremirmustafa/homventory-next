import { timestamp } from 'drizzle-orm/pg-core';

export const sharedTimeColumns = {
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
  deletedAt: timestamp('deleted_at', { mode: 'string' }),
};
