'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFamilyAndConnectToUserAction, updateFamilyAction } from './actions';
import { familyFormSchema, FamilyFormValues } from './schema';
import { useState, useTransition } from 'react';
import Icon from '@/components/icons';

interface IProps {
  initialValues?: FamilyFormValues;
}

export function FamilyForm(props: IProps) {
  const { initialValues } = props;
  const isEditing = Boolean(initialValues);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<FamilyFormValues>({
    resolver: zodResolver(familyFormSchema),
    defaultValues: initialValues ?? {
      name: '',
      description: '',
    },
  });

  function onSubmit(values: FamilyFormValues) {
    startTransition(async () => {
      form.clearErrors();
      if (isEditing) {
        const res = await updateFamilyAction(values);
        if (!res?.success) {
          form.setError('root', { message: res.message });
        } else {
          toast({
            title: 'Success!',
            description: 'Family is updated successfully.',
          });
          setOpen(false);
        }
      } else {
        const res = await createFamilyAndConnectToUserAction(values);
        if (!res?.success) {
          form.setError('root', { message: res.message });
        } else {
          toast({
            title: 'Success!',
            description: 'Family is created successfully.',
          });
          setOpen(false);
        }
      }
    });
  }

  const formTitle = isEditing ? 'Edit your family' : 'Create your family!';
  const formDescription = isEditing
    ? 'Edit your family name and description'
    : 'Create your family and start inviting family members!';

  const buttonIcon = isEditing ? (
    <Icon icon="edit" className="ml-2" />
  ) : (
    <Icon icon="personAdd" className="ml-2" />
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          {formTitle} {buttonIcon}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{formTitle}</DialogTitle>
          <DialogDescription>{formDescription}</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My lovely family" {...field} disabled={isPending} />
                  </FormControl>
                  <FormDescription>This is the name of your family</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="My cute lovely family or little three fellas"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>Give a description to your family</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
          {form.formState.errors.root && (
            <div className="text-red-500 text-sm">{form.formState.errors.root.message}</div>
          )}
          <DialogFooter>
            <Button onClick={() => form.handleSubmit(onSubmit)} disabled={isPending}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
