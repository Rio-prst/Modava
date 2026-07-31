import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RejectPledgeSchema = z.object({
  reason: z.string().max(500).optional(),
});

export class RejectPledgeDto extends createZodDto(RejectPledgeSchema) {}
