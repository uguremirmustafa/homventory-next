'use client';
import { Button } from '@/components/ui/button';
import { ItemType } from '../queries';
import Link from 'next/link';
import { Icon as IconComponent } from '@iconify/react';
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';

interface IProps {
  itemType: ItemType;
}
function ItemTypeButton(props: IProps): JSX.Element {
  const { itemType: x } = props;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" asChild>
            <Link
              href={`/items/${x.id}`}
              className="col-span-1 h-full aspect-square flex flex-col gap-2"
            >
              <IconComponent icon={x.icon} fontSize="56" />
              <p className="text-center text-sm text-wrap">{x.name}</p>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="px-2 py-1 bg-background rounded border mb-2 max-w-[200px]">
            {x.description}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ItemTypeButton;
