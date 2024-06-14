import { NextAuthConfig } from 'next-auth';
import db from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

export const authConfig = {
  providers: [],
  callbacks: {
    async session({ session, user, token }) {
      const dbUsers = await db
        .select()
        .from(users)
        .where(eq(users.id, token.sub ?? ''))
        .limit(1);
      if (dbUsers && dbUsers.length === 1) {
        session.user.familyId = dbUsers[0]?.familyId;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
