import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { ItemFormValues } from '../schema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

function DetailsStep(): JSX.Element {
  const form = useFormContext<ItemFormValues>();
  return (
    <div className="max-w-xl">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="My lovely pink t-shirt" {...field} />
            </FormControl>
            <FormDescription>This is the name of your item.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <br />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Pink stripes, white collar, from GAP..." {...field} />
            </FormControl>
            <FormDescription>Some details about your item.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default DetailsStep;
