import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UploadDocumentSchema = z.object({
  documentType: z.enum(['NIB', 'NPWP', 'IUMK', 'SERTIFIKAT_HALAL', 'TDP']),
});

export class UploadDocumentDto extends createZodDto(UploadDocumentSchema) {}
