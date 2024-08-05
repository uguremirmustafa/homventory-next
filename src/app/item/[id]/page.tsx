import { Icon as IconComponent } from '@iconify/react';
import db from '@/db';
import { item, itemImage, itemType, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import Link from 'next/link';

export default async function ItemPage({ params }: { params: { id: string } }) {
  const items = await db
    .select({
      id: item.id,
      name: item.name,
      description: item.description,
      url: itemImage.url,
      typeId: item.itemTypeID,
      typeName: itemType.name,
      typeIcon: itemType.icon,
      owner: users.name,
      ownerAvatar: users.image,
      createdAt: item.createdAt,
    })
    .from(item)
    .innerJoin(itemImage, eq(itemImage.itemId, item.id))
    .innerJoin(itemType, eq(itemType.id, item.itemTypeID))
    .innerJoin(users, eq(users.id, item.ownerID))
    .where(eq(item.id, Number(params.id)));

  if (items.length !== 1) {
    return <div>item not found</div>;
  }

  const { name, description, id, typeIcon, typeId, typeName, url, owner, ownerAvatar, createdAt } =
    items[0];
  return (
    <div className="max-w-[400px]">
      <h1 className="text-xl md:text-2xl font-extrabold">{name}</h1>
      <Image className="rounded my-4" height={400} width={400} src={url ?? ''} alt={name} />
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
      <div className="flex gap-2 items-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src={ownerAvatar ?? ''} alt={owner ?? ''} />
          <AvatarFallback>{(owner ?? ' ').charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium leading-none">{owner}</p>
      </div>
      <p className="text-muted-foreground mt-4">{description}</p>
    </div>
  );
}
