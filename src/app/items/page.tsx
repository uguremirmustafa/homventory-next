import { auth } from '@/auth';
import PageTitle from '@/components/page-title';
import db from '@/db';
import { item, itemType } from '@/db/schema';
import { eq, isNull } from 'drizzle-orm';
import { Nav } from './components/nav';

export default async function ItemsPage() {
  const session = await auth();

  const items = await db
    .select()
    .from(item)
    .where(eq(item.ownerID, session?.user.id ?? ''));

  const itemTypes = await db
    .select({ name: itemType.name, description: itemType.description, icon: itemType.icon })
    .from(itemType)
    .where(isNull(itemType.deletedAt));
  return (
    <div>
      <PageTitle primary="Inventory" />
      <div className="border mt-4 rounded w-auto">
        <Nav
          isCollapsed={true}
          links={itemTypes.map((x) => ({
            icon: x.icon,
            title: x.name,
            variant: 'ghost',
          }))}
        />
      </div>
      {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
    </div>
  );
}
