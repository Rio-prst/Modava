import { Injectable, Inject, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ICampaignRepository } from './interfaces/campaign.repository.interface.js';
import { INotificationService } from '../notification/interfaces/notification.service.interface.js';

@Injectable()
export class CampaignScheduler {
  private readonly logger = new Logger(CampaignScheduler.name);

  constructor(
    @Inject(ICampaignRepository)
    private readonly campaignRepository: ICampaignRepository,
    @Inject(INotificationService)
    private readonly notificationService: INotificationService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async closeEndedCampaigns() {
    this.logger.log('Checking for expired campaigns...');

    const expiredCampaigns =
      await this.campaignRepository.findExpiredActiveCampaigns(new Date());

    for (const campaign of expiredCampaigns) {
      await this.campaignRepository.updateStatus(campaign.id, 'CLOSED');

      await this.notificationService.create({
        userId: campaign.ownerUserId,
        type: 'CAMPAIGN_ENDED',
        title: 'Campaign berakhir',
        message: `Campaign "${campaign.title}" telah mencapai batas waktu pendanaan.`,
        referenceId: campaign.id,
        referenceType: 'campaign',
      });

      this.logger.log(`Closed campaign: ${campaign.id} - ${campaign.title}`);
    }

    if (expiredCampaigns.length === 0) {
      this.logger.log('No expired campaigns found.');
    }
  }
}
