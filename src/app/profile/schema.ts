import { z } from 'zod';

export const familyFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Family name is too short!',
  }),
  description: z.string().min(2, {
    message: 'Family description is too short!',
  }),
});

export type FamilyFormValues = z.infer<typeof familyFormSchema>;

export const familyJoinFormSchema = z.object({
  code: z.string().min(4, { message: 'Code is too short' }),
});
export type FamilyJoinFormValues = z.infer<typeof familyJoinFormSchema>;
