import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const VerifyDocumentSchema = z.object({
  status: z.enum(['VERIFIED', 'REJECTED']),
  notes: z.string().optional(),
});

export class VerifyDocumentDto extends createZodDto(VerifyDocumentSchema) {}
