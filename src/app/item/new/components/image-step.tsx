/* eslint-disable @next/next/no-img-element */
import Icon from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ImageUpload from './image-upload';
import { useFormContext } from 'react-hook-form';
import { ItemFormValues } from '../schema';
import TakePicture from './take-picture';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const imagePreferences = ['webcam', 'upload'] as const;

type ImagePreference = (typeof imagePreferences)[number];

function ImageStep(): JSX.Element {
  const [preference, setPreference] = useState<ImagePreference>();
  const form = useFormContext<ItemFormValues>();
  function onImageUpload(imgUrl: string) {
    form.setValue('image', imgUrl);
    form.clearErrors('image');
    setPreference(undefined);
  }

  const img = form.watch('image');
  return (
    <div>
      {img ? (
        <div className="mb-3">
          <img
            src={img}
            alt="img"
            className="rounded ring-2 outline-offset-2 mb-3 max-h-96 object-contain"
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setPreference(undefined);
              form.setValue('image', '');
            }}
          >
            Change Image <Icon icon="editImg" className="ml-2" fontSize={18} />
          </Button>
        </div>
      ) : null}
      {!preference && !img && (
        <div className="flex gap-2">
          <ImageUpload onSuccess={onImageUpload} />
          <TakePicture onSuccess={onImageUpload} />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Url</FormLabel>
                <FormControl>
                  <Input placeholder="https://myimage.com/sweater.jpg" {...field} />
                </FormControl>
                <FormDescription>You can directly store your image url here</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      {form.formState.errors.image && (
        <p className={cn('text-sm font-medium text-destructive mt-2')}>
          {form.formState.errors.image.message}
        </p>
      )}
    </div>
  );
}

export default ImageStep;
