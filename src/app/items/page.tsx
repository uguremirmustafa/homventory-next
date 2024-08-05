import { auth } from '@/auth';
import PageTitle from '@/components/page-title';
import { getItemTypes } from './queries';
import { Icon as IconComponent } from '@iconify/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Icon from '@/components/icons';
import { Separator } from '@/components/ui/separator';

export default async function ItemsPage() {
  const session = await auth();

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
        {itemTypes.map((x) => {
          return (
            <Button key={x.id} asChild variant="outline">
              <Link
                href={`/items/${x.id}`}
                className="col-span-1 h-full aspect-square flex flex-col gap-2"
              >
                <IconComponent icon={x.icon} fontSize="56" />
                <p className="text-center text-sm text-wrap">{x.name}</p>
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
