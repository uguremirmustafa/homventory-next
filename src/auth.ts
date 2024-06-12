import NextAuth from 'next-auth';
import google from 'next-auth/providers/google';
import env from './env';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import db from './db';

export const { handlers, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});
