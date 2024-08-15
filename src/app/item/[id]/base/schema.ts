import { z } from 'zod';

export const itemDetailFormSchema = z.object({
  price: z.number().min(0, { message: 'Item price cannot be less than 0 (zero)...' }),
  gatheringDate: z.date().nullable(),
  brandName: z.string(),
  url: z.string(),
});

export type ItemDetailFormValues = z.infer<typeof itemDetailFormSchema>;
