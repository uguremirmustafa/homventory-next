import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Icon as IconComponent } from '@iconify/react';

import Icon from '@/components/icons';
import { getItemTypes } from '../../queries';
export default async function ItemBreadcrumb({ itemTypeId }: { itemTypeId: number }) {
  const itemTypes = await getItemTypes();
  const itemType = itemTypes.find((x) => x.id === itemTypeId);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/items">Inventory</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              Item Types
              <Icon icon="chevronDown" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {itemTypes.map((x) => (
                <DropdownMenuItem asChild key={x.id}>
                  <Link href={`/items/${x.id}`} className="flex gap-2 items-center">
                    <IconComponent icon={x.icon} /> {x.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage style={{ textTransform: 'capitalize' }}>
            {itemType?.name ?? ''}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
