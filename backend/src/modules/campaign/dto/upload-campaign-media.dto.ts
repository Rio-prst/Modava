import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UploadCampaignMediaSchema = z.object({
  fileUrl: z.string().url(),
  fileType: z.enum(['IMAGE', 'DOCUMENT']),
  isPrimary: z.boolean().optional().default(false),
});

export class UploadCampaignMediaDto extends createZodDto(
  UploadCampaignMediaSchema,
) {}
