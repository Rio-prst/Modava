import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreatePledgeSchema = z.object({
  campaignId: z.string().uuid(),
  amount: z.number().positive(),
  message: z.string().max(500).optional(),
});

export class CreatePledgeDto extends createZodDto(CreatePledgeSchema) {}
