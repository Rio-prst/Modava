import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { ICampaignRepository } from './interfaces/campaign.repository.interface.js';
import type {
  CreateCampaignInput,
  UpdateCampaignInput,
} from './interfaces/campaign.repository.interface.js';
import { ICampaignService } from './interfaces/campaign.service.interface.js';

@Injectable()
export class CampaignService implements ICampaignService {
  constructor(
    @Inject(ICampaignRepository)
    private readonly campaignRepository: ICampaignRepository,
  ) {}

  async create(clerkUserId: string, data: CreateCampaignInput) {
    const profile =
      await this.campaignRepository.findUmkmProfileByClerkUserId(clerkUserId);

    if (!profile) {
      throw new NotFoundException(
        'UMKM profile not found. Create profile first.',
      );
    }

    return this.campaignRepository.create(profile.id, data);
  }

  async findAll(clerkUserId: string) {
    const profile =
      await this.campaignRepository.findUmkmProfileByClerkUserId(clerkUserId);

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    return this.campaignRepository.findAllByUmkmProfileId(profile.id);
  }

  async findById(clerkUserId: string, id: string) {
    const profile =
      await this.campaignRepository.findUmkmProfileByClerkUserId(clerkUserId);

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    const campaign = await this.campaignRepository.findById(id);

    if (!campaign) {
      throw new NotFoundException('Campaign not found.');
    }

    if (campaign.umkmProfileId !== profile.id) {
      throw new NotFoundException('Campaign not found.');
    }

    return campaign;
  }

  async update(clerkUserId: string, id: string, data: UpdateCampaignInput) {
    const profile =
      await this.campaignRepository.findUmkmProfileByClerkUserId(clerkUserId);

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    const campaign = await this.campaignRepository.findById(id);

    if (!campaign) {
      throw new NotFoundException('Campaign not found.');
    }

    if (campaign.umkmProfileId !== profile.id) {
      throw new NotFoundException('Campaign not found.');
    }

    if (campaign.status !== 'DRAFT') {
      throw new ConflictException('Only draft campaigns can be edited.');
    }

    return this.campaignRepository.update(id, data);
  }

  async activate(clerkUserId: string, id: string) {
    const profile =
      await this.campaignRepository.findUmkmProfileByClerkUserId(clerkUserId);

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    const campaign = await this.campaignRepository.findById(id);

    if (!campaign) {
      throw new NotFoundException('Campaign not found.');
    }

    if (campaign.umkmProfileId !== profile.id) {
      throw new NotFoundException('Campaign not found.');
    }

    if (campaign.status !== 'DRAFT') {
      throw new ConflictException('Only draft campaigns can be activated.');
    }

    return this.campaignRepository.updateStatus(id, 'ACTIVE');
  }
}
