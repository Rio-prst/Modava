import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateLoanSimulationSchema = z.object({
  amount: z.number().positive(),
  tenor: z.number().int().min(1).max(60),
});

export class CreateLoanSimulationDto extends createZodDto(
  CreateLoanSimulationSchema,
) {}
