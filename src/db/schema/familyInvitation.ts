import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import family from './family';
import { users } from './user';
import { sql } from 'drizzle-orm';

const familyInvitation = pgTable('family_invitation', {
  id: serial('id').primaryKey(),
  familyID: integer('family_id').references(() => family.id),
  inviterID: text('owner_id').references(() => users.id),
  code: text('code').notNull(),
  validUntil: timestamp('valid_until', { mode: 'string' })
    .notNull()
    .default(sql`now() + interval '30 minutes'`),
});

export default familyInvitation;
