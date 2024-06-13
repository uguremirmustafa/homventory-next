import NextAuth from 'next-auth';
import google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import db from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

export const { handlers, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const dbUsers = await db.select().from(users).where(eq(users.email, user.email)).limit(1);
      if (dbUsers && dbUsers.length === 1) {
        session.user.familyId = dbUsers[0]?.familyId;
      }
      return session;
    },
  },
});
