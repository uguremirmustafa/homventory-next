console.log('hello');
// 'use client';
// import { config } from 'dotenv';
// import { expand } from 'dotenv-expand';

// import { ZodError, z } from 'zod';

// const stringBoolean = z.coerce
//   .string()
//   .transform((val) => {
//     return val === 'true';
//   })
//   .default('false');

// const envSchema = z.object({
//   POSTGRES_URL: z.string().min(1),
//   DB_MIGRATING: stringBoolean,
//   DB_SEEDING: stringBoolean,
//   NODE_ENV: z.string().default('development'),
//   DB_HOST: z.string().min(1),
//   DB_NAME: z.string().min(1),
//   DB_USER: z.string().min(1),
//   DB_PASSWORD: z.string().min(1),
//   GOOGLE_CLIENT_ID: z.string().min(1),
//   GOOGLE_CLIENT_SECRET: z.string().min(1),
//   GOOGLE_AUTH_REDIRECT: z.string().min(1),
//   NEXTAUTH_SECRET: z.string().min(1),
// });

// expand(config({ path: '.env.local' }));

// try {
//   envSchema.parse(process.env);
// } catch (error) {
//   if (error instanceof ZodError) {
//     let message = 'Missing required values in .env:\n';
//     error.issues.forEach((issue) => {
//       message += issue.path[0] + '\n';
//     });
//     const e = new Error(message);
//     e.stack = '';
//     throw e;
//   } else {
//     console.error(error);
//   }
// }

// export default envSchema.parse(process.env);
