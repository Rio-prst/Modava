import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateCampaignSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10),
  fundingGoal: z.number().positive(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  loanSimulationId: z.string().uuid().optional(),
});

export class CreateCampaignDto extends createZodDto(CreateCampaignSchema) {}
