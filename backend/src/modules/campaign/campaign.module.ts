import { Module } from '@nestjs/common';
import { CampaignController } from './campaign.controller.js';
import { CampaignService } from './campaign.service.js';
import { CampaignRepository } from './campaign.repository.js';
import { ICampaignRepository } from './interfaces/campaign.repository.interface.js';
import { ICampaignService } from './interfaces/campaign.service.interface.js';

@Module({
  controllers: [CampaignController],
  providers: [
    { provide: ICampaignService, useClass: CampaignService },
    { provide: ICampaignRepository, useClass: CampaignRepository },
  ],
  exports: [ICampaignService],
})
export class CampaignModule {}
