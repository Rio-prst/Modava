import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IPledgeRepository } from './interfaces/pledge.repository.interface.js';
import { IPledgeService } from './interfaces/pledge.service.interface.js';
import type { CreatePledgeDtoInput } from './interfaces/pledge.service.interface.js';

@Injectable()
export class PledgeService implements IPledgeService {
  constructor(
    @Inject(IPledgeRepository)
    private readonly pledgeRepository: IPledgeRepository,
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

    return this.pledgeRepository.create({
      campaignId: data.campaignId,
      userId: user.id,
      amount: data.amount,
      message: data.message,
    });
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
