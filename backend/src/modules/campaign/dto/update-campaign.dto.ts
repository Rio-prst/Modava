import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateCampaignSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  description: z.string().min(10).optional(),
  fundingGoal: z.number().positive().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  loanSimulationId: z.string().uuid().optional(),
});

export class UpdateCampaignDto extends createZodDto(UpdateCampaignSchema) {}
