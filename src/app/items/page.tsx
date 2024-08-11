import { auth } from '@/auth';
import PageTitle from '@/components/page-title';
import { getItemTypes } from './queries';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Icon from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';
import ItemTypeButton from './components/item-type-button';

export default async function ItemsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/items');
  }

  const itemTypes = await getItemTypes();

  return (
    <div>
      <div className="flex justify-between w-100">
        <div>
          <PageTitle primary="Inventory" />
        </div>
        <Button asChild variant="default" size="sm">
          <Link href="/item/new">
            New Item <Icon icon="add" className="ml-2" />
          </Link>
        </Button>
      </div>
      <div className="mb-3 mt-5">
        <h3 className="mb-3 font-bold text-xl">Categories</h3>
        <p className="text-muted-foreground">Select a category to see the items</p>
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {itemTypes.map((x) => (
          <ItemTypeButton itemType={x} key={x.icon} />
        ))}
      </div>
    </div>
  );
}
