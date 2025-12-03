import { z } from 'zod';

export const editHealthCardFormSchema = z.object({
  healthConditions: z.array(z.string()),
  bloodType: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  disability: z.string().optional(),
  notes: z.string().optional(),
});

export type EditHealthCardFormData = z.infer<typeof editHealthCardFormSchema>;
