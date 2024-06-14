import { config } from 'dotenv';
config({ path: process.env.NODE_ENV === 'development' ? '.env.local' : '.env' });
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
    url: process.env.DATABASE_URL!,
  },
  verbose: false,
  strict: true,
} satisfies Config;
