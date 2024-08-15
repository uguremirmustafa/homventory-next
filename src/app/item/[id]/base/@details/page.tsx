import { getItemDetails } from '../queries';
import DetailsForm from './details-form';

export default async function DetailsPage({ params }: { params: { id: string } }) {
  const itemId = Number(params.id);
  const it = await getItemDetails(itemId);
  return (
    <div>
      <DetailsForm
        initialValues={{
          price: it?.price ?? 0,
          gatheringDate: it?.gatheringDate ? new Date(it.gatheringDate) : null,
          brandName: it?.brandName ?? '',
          url: it?.url ?? '',
        }}
        itemId={itemId}
      />
    </div>
  );
}
