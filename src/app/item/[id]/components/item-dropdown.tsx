'use client';

import Icon from '@/components/icons';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import DeleteItemDialog from './delete-item-dialog';

interface IProps {
  id: number;
}

function ItemDropdown(props: IProps) {
  const { id } = props;

  return (
    <AlertDialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Icon icon="verticalDots" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex justify-between" asChild>
            <Link href={`/item/${id}/edit`}>
              <span>Edit item</span>
              <Icon icon="edit" />
            </Link>
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="flex justify-between">
              <span>Delete Item</span>
              <Icon icon="delete" />
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteItemDialog id={id} />
    </AlertDialog>
  );
}

export default ItemDropdown;
