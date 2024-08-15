import { getItemTypes } from '@/app/items/queries';
import ItemForm from '../../new/components/item-form';
import { getItemWithDetails } from '../base/queries';
import PageTitle from '@/components/page-title';

export default async function EditItemPage({ params }: { params: { id: number } }) {
  const item = await getItemWithDetails(params.id);
  const itemTypes = await getItemTypes();

  if (!item) {
    return <div>item not found</div>;
  }

  return (
    <div>
      <PageTitle primary="Edit item" />
      <p className="mt-5 text-muted-foreground mb-5 border-b pb-4">
        Edit item details and update your inventory...
      </p>
      <ItemForm
        itemTypes={itemTypes}
        id={item.id}
        initialValues={{
          name: item.name,
          description: item.description,
          image: item.url,
          itemTypeId: item.typeId?.toString() ?? '',
        }}
      />
    </div>
  );
}
