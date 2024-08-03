import { NextAuthConfig } from 'next-auth';
import db from './db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

export const authConfig = {
  providers: [],
  callbacks: {
    async session({ session, user }) {
      const dbUsers = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
      if (dbUsers && dbUsers.length === 1) {
        session.user.familyId = dbUsers[0]?.familyId;
      } else {
        console.log('dbUser not found');
      }
      return session;
    },
  },
  session: {
    strategy: 'database',
  },
  adapter: DrizzleAdapter(db),
} satisfies NextAuthConfig;
