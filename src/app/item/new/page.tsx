import PageTitle from '@/components/page-title';
import { getItemTypes } from '@/app/items/queries';
import ItemForm from './components/item-form';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function NewItemPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/item/new');
  }
  const itemTypes = await getItemTypes();
  return (
    <div className="max-w-6xl mx-auto">
      <PageTitle primary="New Item" />
      <p className="mt-5 text-muted-foreground mb-5 border-b pb-4">
        Add an item to your home inventory.
      </p>
      <ItemForm itemTypes={itemTypes} />
    </div>
  );
}
