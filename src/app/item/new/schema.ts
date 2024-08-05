import { z } from 'zod';

export const itemFormSchema = z.object({
  name: z.string().min(2, { message: 'Item name is too short!' }),
  description: z.string().min(2, { message: 'Item description is too short!' }),
  itemTypeId: z.string().min(1, { message: 'Item type required' }),
  image: z.string().url(),
});

export type ItemFormValues = z.infer<typeof itemFormSchema>;
