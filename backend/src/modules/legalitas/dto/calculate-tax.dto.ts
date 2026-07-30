import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CalculateTaxSchema = z.object({
  omzet: z.number().positive(),
});

export class CalculateTaxDto extends createZodDto(CalculateTaxSchema) {}
