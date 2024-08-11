import { Icon as IconComponent } from '@iconify/react';
import db from '@/db';
import { item, itemImage, itemType, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Icon from '@/components/icons';
import { getItemWithDetails } from './queries';
import ItemDropdown from './components/item-dropdown';

export default async function ItemPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) {
    redirect(`/api/auth/signin?callbackUrl=/item/${params.id}`);
  }
  const item = await getItemWithDetails(Number(params.id));

  if (!item) {
    return <div>item not found</div>;
  }

  const { name, description, id, typeIcon, typeId, typeName, url, owner, ownerAvatar, createdAt } =
    item;

  return (
    <div className="max-w-[500px]">
      <h1 className="text-xl md:text-2xl font-extrabold">{name}</h1>
      <Image className="rounded my-4" height={500} width={500} src={url ?? ''} alt={name} />
      <div className="flex justify-between border-b pb-2 mb-3">
        <Link
          href={`/items/${typeId}`}
          className="flex gap-2 items-center p-1 hover:bg-secondary rounded-sm transition-all ease-in-out"
        >
          <IconComponent icon={typeIcon} fontSize={14} />
          <p className="capitalize text-sm">{typeName}</p>
        </Link>
        <p className="text-sm py-1">{format(new Date(createdAt), 'dd MMM yyyy')}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src={ownerAvatar ?? ''} alt={owner ?? ''} />
            <AvatarFallback>{(owner ?? ' ').charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium leading-none">{owner}</p>
        </div>
        <ItemDropdown id={id} />
      </div>
      <p className="text-muted-foreground mt-4">{description}</p>
    </div>
  );
}
