import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { IPledgeRepository } from './interfaces/pledge.repository.interface.js';
import { IPledgeService } from './interfaces/pledge.service.interface.js';
import type { CreatePledgeDtoInput } from './interfaces/pledge.service.interface.js';
import { INotificationService } from '../notification/interfaces/notification.service.interface.js';

@Injectable()
export class PledgeService implements IPledgeService {
  constructor(
    @Inject(IPledgeRepository)
    private readonly pledgeRepository: IPledgeRepository,
    @Inject(INotificationService)
    private readonly notificationService: INotificationService,
  ) {}

  async create(clerkUserId: string, data: CreatePledgeDtoInput) {
    const user = await this.pledgeRepository.findUserByClerkUserId(clerkUserId);

    if (!user) {
      throw new NotFoundException('User not found. Sync user first.');
    }

    const campaign = await this.pledgeRepository.findCampaignById(
      data.campaignId,
    );

    if (!campaign) {
      throw new NotFoundException('Campaign not found.');
    }

    if (campaign.status !== 'ACTIVE') {
      throw new BadRequestException('Campaign is not accepting pledges.');
    }

    const campaignOwner = await this.pledgeRepository.findCampaignOwnerId(
      data.campaignId,
    );

    if (!campaignOwner) {
      throw new NotFoundException('Campaign owner not found.');
    }

    if (campaignOwner.userId === user.id) {
      throw new BadRequestException('Cannot pledge to your own campaign.');
    }

    const pledge = await this.pledgeRepository.create({
      campaignId: data.campaignId,
      userId: user.id,
      amount: data.amount,
      message: data.message,
    });

    const newAmountRaised = campaign.amountRaised + data.amount;

    if (newAmountRaised >= campaign.fundingGoal) {
      await this.pledgeRepository.updateCampaignStatus(
        data.campaignId,
        'FUNDED',
      );

      await this.notificationService.create({
        userId: campaignOwner.userId,
        type: 'TARGET_REACHED',
        title: 'Target campaign tercapai!',
        message: `Selamat! Campaign Anda telah mencapai target pendanaan sebesar Rp${campaign.fundingGoal.toLocaleString()}.`,
        referenceId: pledge.id,
        referenceType: 'pledge',
      });
    }

    await this.notificationService.create({
      userId: campaignOwner.userId,
      type: 'PLEDGE_NEW',
      title: 'Pledge baru diterima!',
      message: `Ada pledge baru sebesar Rp${pledge.amount.toLocaleString()} untuk campaign Anda.`,
      referenceId: pledge.id,
      referenceType: 'pledge',
    });

    return pledge;
  }

  async cancel(clerkUserId: string, id: string) {
    const user = await this.pledgeRepository.findUserByClerkUserId(clerkUserId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const pledge = await this.pledgeRepository.findPledgeById(id);

    if (!pledge) {
      throw new NotFoundException('Pledge not found.');
    }

    if (pledge.userId !== user.id) {
      throw new ForbiddenException('Access denied.');
    }

    await this.pledgeRepository.deletePledgeAndRefund(
      id,
      pledge.campaignId,
      pledge.amount,
    );
  }

  async findAllByCampaign(campaignId: string) {
    const campaign = await this.pledgeRepository.findCampaignById(campaignId);

    if (!campaign) {
      throw new NotFoundException('Campaign not found.');
    }

    return this.pledgeRepository.findAllByCampaignId(campaignId);
  }

  async findAllMy(clerkUserId: string) {
    const user = await this.pledgeRepository.findUserByClerkUserId(clerkUserId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return this.pledgeRepository.findAllByUserId(user.id);
  }
}
