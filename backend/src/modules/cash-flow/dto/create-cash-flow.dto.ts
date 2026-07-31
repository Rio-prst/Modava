import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateCashFlowSchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE']),
  amount: z.number().positive(),
  description: z.string(),
  category: z.string().optional(),
  transactionDate: z.string(),
});

export class CreateCashFlowDto extends createZodDto(CreateCashFlowSchema) {}
