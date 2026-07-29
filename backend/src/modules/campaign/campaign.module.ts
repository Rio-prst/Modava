import { Module } from '@nestjs/common';
import { CampaignController } from './campaign.controller.js';
import { CampaignService } from './campaign.service.js';
import { CampaignRepository } from './campaign.repository.js';
import { CampaignScheduler } from './campaign-scheduler.js';
import { ICampaignRepository } from './interfaces/campaign.repository.interface.js';
import { ICampaignService } from './interfaces/campaign.service.interface.js';
import { NotificationModule } from '../notification/notification.module.js';

@Module({
  imports: [NotificationModule],
  controllers: [CampaignController],
  providers: [
    { provide: ICampaignService, useClass: CampaignService },
    { provide: ICampaignRepository, useClass: CampaignRepository },
    CampaignScheduler,
  ],
  exports: [ICampaignService],
})
export class CampaignModule {}
