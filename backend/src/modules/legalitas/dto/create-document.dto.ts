import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateDocumentSchema = z.object({
  documentType: z.enum(['NIB', 'NPWP', 'IUMK', 'SERTIFIKAT_HALAL', 'TDP']),
  fileUrl: z.string().url(),
  fileName: z.string().min(1),
});

export class CreateDocumentDto extends createZodDto(CreateDocumentSchema) {}
