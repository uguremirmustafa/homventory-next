'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
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
import { joinFamilyAction } from './actions';
import { familyJoinFormSchema, FamilyJoinFormValues } from './schema';
import { useState, useTransition } from 'react';

export function FamilyJoinForm() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<FamilyJoinFormValues>({
    resolver: zodResolver(familyJoinFormSchema),
    defaultValues: { code: '' },
  });

  function onSubmit(values: FamilyJoinFormValues) {
    startTransition(async () => {
      form.clearErrors();
      const res = await joinFamilyAction(values);
      if (!res?.success) {
        form.setError('root', { message: res.message });
      } else {
        toast({ title: 'Success!', description: res.message });
        setOpen(false);
        form.reset();
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          Join Family
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join to Family</DialogTitle>
          <DialogDescription>Enter your family code to join.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Form {...form}>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family Code</FormLabel>
                  <FormControl>
                    <Input placeholder="XXXX-XXXX" {...field} disabled={isPending} />
                  </FormControl>
                  <FormDescription>
                    This is the code that your family member has shared with you.
                  </FormDescription>
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
