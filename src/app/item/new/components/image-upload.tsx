import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useTransition } from 'react';
import { uploadImageAction } from '../actions';
import { toast } from '@/components/ui/use-toast';
import Icon from '@/components/icons';

interface IProps {
  onSuccess: (imgUrl: string) => void;
}

function ImageUpload(props: IProps): JSX.Element {
  const { onSuccess } = props;
  const [file, setFile] = useState<File>();
  const url = file ? URL.createObjectURL(file) : null;
  const [isPending, startTransition] = useTransition();

  function uploadImage() {
    startTransition(async () => {
      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = await new Uint8Array(arrayBuffer);
        const res = await uploadImageAction(buffer);
        if (res.success && res.data) {
          toast({ title: 'Success', description: res.message });
          setFile(undefined);
          onSuccess(res.data);
        } else {
          toast({ title: 'Failed', description: res.message });
          setFile(undefined);
        }
      } else {
        toast({ title: 'Failed', description: 'No file found to upload' });
      }
    });
  }

  return (
    <div>
      <Label
        htmlFor="picture"
        className="w-32 aspect-square flex flex-col items-center justify-center gap-4 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer peer-data-[state=checked]:bg-slate-700"
      >
        <Icon icon="upload" fontSize={36} />
        <span className="text-sm text-center">Upload</span>
      </Label>
      <Input
        id="picture"
        type="file"
        className="sr-only hidden"
        accept=".png,.jpeg,.jpg"
        onChange={(e) => {
          const files = e.target.files;
          const f = files && files.length > 0 ? files[0] : null;
          if (f) {
            if (f.size > 1000000) {
              toast({
                title: 'Failed',
                description: 'File is too big',
                variant: 'destructive',
                duration: 1500,
              });
              setFile(undefined);
            } else {
              setFile(f);
            }
          }
        }}
      />
      <Dialog open={Boolean(url)} onOpenChange={() => setFile(undefined)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Do you want to upload?</DialogTitle>
            <DialogDescription>
              Here is the selected image, do you want to upload it?
            </DialogDescription>
          </DialogHeader>
          {url && <img src={url} className="h-60 object-contain mt-4 mx-auto rounded" />}
          <DialogFooter>
            <Button
              type="button"
              onClick={() => {
                uploadImage();
              }}
              disabled={isPending}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ImageUpload;
