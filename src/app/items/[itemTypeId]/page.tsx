import { auth } from '@/auth';

import { getItemsInType, getItemTypes } from '../queries';
import ItemBreadcrumb from './components/breadcrumb';

export default async function ItemsInCategory({ params }: { params: { itemTypeId: string } }) {
  const session = await auth();
  const { itemTypeId } = params;
  const familyId = session?.user.familyId ?? 0;
  const items = await getItemsInType({ familyId, itemTypeId: Number(itemTypeId) });

  return (
    <div>
      <ItemBreadcrumb itemTypeId={Number(itemTypeId)} />
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
