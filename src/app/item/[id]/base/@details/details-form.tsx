'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { ItemDetailFormValues } from '../schema';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/icons';
import { useTransition } from 'react';
import { saveItemDetailAction } from './actions';
import { toast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';

interface IProps {
  initialValues?: ItemDetailFormValues;
  itemId: number;
}

function DetailsForm(props: IProps): JSX.Element {
  const { initialValues, itemId } = props;
  const form = useForm<ItemDetailFormValues>({
    defaultValues: initialValues ?? {
      price: 0,
      gatheringDate: null,
      brandName: '',
      url: '',
    },
  });
  const [isPending, startTransition] = useTransition();

  function onSubmit(values: ItemDetailFormValues) {
    startTransition(async () => {
      const res = await saveItemDetailAction(itemId, values);
      if (!res.success) {
        toast({
          title: 'Failed',
          description: res.message,
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Success!', description: res.message });
      }
    });
  }

  return (
    <div className="p-4 md:p-8 border rounded-md">
      <h4 className="text-xl font-bold">Details</h4>
      <p className="text-muted-foreground">Manage details of your item...</p>
      <Separator className="my-4" />
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="item-detail-form"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="max-w-xs">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" {...field} />
                  </FormControl>
                  <FormDescription>Price of the item when you purchase it.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gatheringDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm">Date of gathering</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <Icon icon="calendar" className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1970-01-01')}
                        initialFocus
                        showOutsideDays={false}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    When did you buy it? Was it a birthday gift? Remember it...
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <Input placeholder="https://amazon.co.uk/..." {...field} />
                      {field.value ? (
                        <Button asChild type="button" variant="secondary">
                          <a target="_blank" href={field.value}>
                            <Icon icon="linkExternal" />
                            <span className="ml-2">Open Link</span>
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </FormControl>
                  <FormDescription>Online store link for later reference</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem className="max-w-xs">
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Ikea, Mavi etc." {...field} />
                  </FormControl>
                  <FormDescription>Brand of your item</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <div className="flex justify-end mt-4">
            <Button
              className=""
              size="sm"
              variant="default"
              type="submit"
              form="item-detail-form"
              disabled={isPending}
            >
              <span className="ml-1">Save changes</span>
              <Icon icon="save" className="ml-2" />
            </Button>
          </div>
        </Form>
      </FormProvider>
    </div>
  );
}

export default DetailsForm;
