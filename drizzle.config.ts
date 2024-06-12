import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema/index.ts',
  dialect: 'postgresql', // "mysql" | "sqlite" | "postgresql"
  out: './src/db/migrations',
  dbCredentials: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    url: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
