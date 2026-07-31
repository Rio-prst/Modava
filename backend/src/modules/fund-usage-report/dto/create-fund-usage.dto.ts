import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateFundUsageSchema = z.object({
  description: z.string().min(1),
  amount: z.number().positive(),
  notes: z.string().optional(),
});

export class CreateFundUsageDto extends createZodDto(CreateFundUsageSchema) {}
