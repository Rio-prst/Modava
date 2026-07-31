import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateFundUsageSchema = z.object({
  status: z.enum(['PLANNED', 'SPENT']).optional(),
  description: z.string().min(1).optional(),
  amount: z.number().positive().optional(),
  notes: z.string().optional(),
});

export class UpdateFundUsageDto extends createZodDto(UpdateFundUsageSchema) {}
