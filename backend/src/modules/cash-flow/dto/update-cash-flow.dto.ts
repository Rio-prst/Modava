import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateCashFlowSchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE']).optional(),
  amount: z.number().positive().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  transactionDate: z.string().optional(),
});

export class UpdateCashFlowDto extends createZodDto(UpdateCashFlowSchema) {}
