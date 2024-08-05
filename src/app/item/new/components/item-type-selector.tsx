'use client';

import { getItemTypes } from '@/app/items/queries';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { ItemFormValues } from '../schema';
import { Icon as IconComponent } from '@iconify/react';

interface IProps {
  itemTypes: Awaited<ReturnType<typeof getItemTypes>>;
}

function ItemTypeSelector(props: IProps): JSX.Element {
  const { itemTypes } = props;
  const form = useFormContext<ItemFormValues>();
  return (
    <FormField
      control={form.control}
      name="itemTypeId"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Item type</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value?.toString()}
              className="flex flex-wrap gap-4"
            >
              {itemTypes.map((x) => {
                const val = x.id.toString();
                return (
                  <FormItem key={val}>
                    <RadioGroupItem id={val} value={val} className="peer sr-only" />
                    <Label
                      htmlFor={val}
                      className="w-32 aspect-square flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer peer-data-[state=checked]:bg-slate-700"
                    >
                      <IconComponent icon={x.icon} fontSize="36" />
                      <span className="text-sm text-center">{x.name}</span>
                    </Label>
                  </FormItem>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default ItemTypeSelector;
