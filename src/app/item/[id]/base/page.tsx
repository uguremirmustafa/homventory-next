/* eslint-disable @next/next/no-img-element */
import { Icon as IconComponent } from '@iconify/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getItemWithDetails } from './queries';
import ItemDropdown from '../components/item-dropdown';

export default async function ItemBasePage({ params }: { params: { id: string } }) {
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
    <div>
      <h1 className="text-xl md:text-2xl font-extrabold">{name}</h1>
      <img
        className="rounded my-4 w-full max-h-[300px] object-contain"
        width={0}
        height={0}
        sizes="100vw"
        src={url ?? ''}
        alt={name}
      />
      <div className="flex justify-between border-b pb-2 mb-3">
        <Link
          href={`/items/${typeId}`}
          className="flex gap-2 items-center p-1 hover:bg-secondary rounded-sm transition-all ease-in-out"
        >
          <IconComponent icon={typeIcon} fontSize={14} />
          <p className="capitalize text-sm">{typeName}</p>
        </Link>
        <p className="text-sm py-1">added at {format(new Date(createdAt), 'dd MMM yyyy')}</p>
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
