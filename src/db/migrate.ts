import { db, connection } from '@/db';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

if (!process.env.DB_MIGRATING) {
  throw new Error('You must set DB_MIGRATING to "true" when running migrations');
}

(async () => {
  await migrate(db, { migrationsFolder: './src/db/migrations' });
  await connection.end();
})();
