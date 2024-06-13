import { auth } from '@/auth';
import PageTitle from '@/components/page-title';
import {
  NavigationMenu,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import db from '@/db';
import { item, itemType } from '@/db/schema';
import { NavigationMenuContent, NavigationMenuItem } from '@radix-ui/react-navigation-menu';
import { eq, isNull } from 'drizzle-orm';
import Link from 'next/link';
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
      <div className="border mt-4 rounded">
        <Nav
          isCollapsed={false}
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
