import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateUmkmProfileSchema = z.object({
  businessName: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postalCode: z.string().optional(),
  phoneNumber: z.string().optional(),
  nibNumber: z.string().optional(),
  npwpNumber: z.string().optional(),
});

export class UpdateUmkmProfileDto extends createZodDto(
  UpdateUmkmProfileSchema,
) {}
