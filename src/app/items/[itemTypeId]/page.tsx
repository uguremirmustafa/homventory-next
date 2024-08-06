import { auth } from '@/auth';

import { getItemsInType, getItemTypes } from '../queries';
import ItemBreadcrumb from './components/breadcrumb';
import ItemCard from './components/item-card';
import PageTitle from '@/components/page-title';
import { Separator } from '@/components/ui/separator';

export default async function ItemsInCategory({ params }: { params: { itemTypeId: string } }) {
  const session = await auth();
  const { itemTypeId } = params;
  const familyId = session?.user.familyId ?? 0;
  const items = await getItemsInType({ familyId, itemTypeId: Number(itemTypeId) });

  return (
    <div>
      <ItemBreadcrumb itemTypeId={Number(itemTypeId)} />
      <br />
      <PageTitle primary="Items" />
      <p className="text-muted-foreground">My mostly used items...</p>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((x) => {
          return <ItemCard key={x.id} item={x} />;
        })}
      </div>
    </div>
  );
}
