import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema';

export const connection = postgres(process.env.POSTGRES_URL!, {
  max: process.env.DB_MIGRATING || process.env.DB_SEEDING ? 1 : undefined,
  onnotice: process.env.DB_SEEDING ? () => {} : undefined,
});

export const db = drizzle(connection, {
  schema,
  logger: true,
});

export type db = typeof db;

export default db;
