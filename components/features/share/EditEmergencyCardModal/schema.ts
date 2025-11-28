import { z } from 'zod';

export const editEmergencyCardFormSchema = z.object({
  name: z.string().min(1, { message: 'お名前を入力してください' }),
  condition: z.string().optional(),
  bloodType: z.string().optional(),
  emergencyNotes: z.array(z.string()),
  medications: z.array(z.string()),
  allergies: z.string().optional(),
  caregiverName: z.string().optional(),
  caregiverRelation: z.string().optional(),
  caregiverPhone: z.string().optional(),
  caregiverEmail: z.string().optional(),
  caregiverAddress: z.string().optional(),
  hospitalName: z.string().optional(),
  hospitalPhone: z.string().optional(),
});

export type EditEmergencyCardFormData = z.infer<typeof editEmergencyCardFormSchema>;
