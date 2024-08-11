import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useTransition } from 'react';
import { deleteItemAction } from '../../new/actions';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface IProps {
  id: number;
}

function DeleteItemDialog(props: IProps): JSX.Element {
  const { id } = props;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function onSubmit(id: number) {
    startTransition(async () => {
      const res = await deleteItemAction(id);
      if (!res?.success) {
        toast({
          title: 'Failed!',
          description: res.message,
        });
      } else {
        const path = `/items/${res.data?.itemTypeId}`;
        router.push(path);
        toast({
          title: 'Success!',
          description: res.message,
        });
      }
    });
  }

  return (
    <AlertDialogContent>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(id);
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete the item from your inventory.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction type="submit" disabled={isPending}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  );
}

export default DeleteItemDialog;
