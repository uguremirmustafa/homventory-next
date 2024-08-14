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
import { useToast } from '@/components/ui/use-toast';

import { createFamilyInviteCode } from './actions';
import { useState, useTransition } from 'react';
import Icon from '@/components/icons';

export function FamilyInvite() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState('');

  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  function createCode() {
    startTransition(async () => {
      const res = await createFamilyInviteCode();
      if (res?.success && res?.data) {
        setCode(res.data);
      } else {
        toast({
          title: 'Failed!',
          description: res.message,
        });
        setOpen(false);
      }
    });
  }

  function copyCode(code: string) {
    navigator.clipboard
      .writeText(code)
      .then(() => toast({ title: 'Success!', description: 'Copied to clipboard' }))
      .finally(() => {
        setOpen(false);
        setCode('');
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Invite family member <Icon icon="mail" className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Family Member</DialogTitle>
          <DialogDescription>Create a family member invitation code and share...</DialogDescription>
        </DialogHeader>
        {code ? <p className="text-4xl font-extrabold">{code}</p> : null}
        <DialogFooter>
          {code ? (
            <Button onClick={() => copyCode(code)} disabled={isPending}>
              Copy Code
            </Button>
          ) : (
            <Button onClick={() => createCode()} disabled={isPending}>
              Generate Invitaiton Code
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
