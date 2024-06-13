import NextAuth, { DefaultSession, User } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      familyId: number | null;
    } & DefaultSession['user'];
  }
  interface User extends DefaultSession['user'] {
    familyId: number | null;
  }
}
