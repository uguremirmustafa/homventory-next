import NextAuth from 'next-auth';
import google from 'next-auth/providers/google';

import { authConfig } from './auth.config';

export const { handlers, auth } = NextAuth({
  ...authConfig,
  providers: [google],
});
