import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GenerateLetterSchema = z.object({
  letterType: z.enum(['SURAT_KETERANGAN_USAHA']),
});

export class GenerateLetterDto extends createZodDto(GenerateLetterSchema) {}
