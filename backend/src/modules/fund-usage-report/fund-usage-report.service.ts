import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IFundUsageReportRepository } from './interfaces/fund-usage-report.repository.interface.js';
import type {
  CreateFundUsageInput,
  UpdateFundUsageInput,
} from './interfaces/fund-usage-report.repository.interface.js';
import { IFundUsageReportService } from './interfaces/fund-usage-report.service.interface.js';

@Injectable()
export class FundUsageReportService implements IFundUsageReportService {
  constructor(
    @Inject(IFundUsageReportRepository)
    private readonly fundUsageReportRepository: IFundUsageReportRepository,
  ) {}

  async create(
    clerkUserId: string,
    campaignId: string,
    data: Omit<CreateFundUsageInput, 'campaignId'>,
  ) {
    const profile =
      await this.fundUsageReportRepository.findUmkmProfileByClerkUserId(
        clerkUserId,
      );

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    const campaign =
      await this.fundUsageReportRepository.findCampaignById(campaignId);

    if (!campaign) {
      throw new NotFoundException('Campaign not found.');
    }

    if (campaign.umkmProfileId !== profile.id) {
      throw new NotFoundException('Campaign not found.');
    }

    return this.fundUsageReportRepository.create({
      ...data,
      campaignId,
    });
  }

  async findAll(clerkUserId: string, campaignId: string) {
    const profile =
      await this.fundUsageReportRepository.findUmkmProfileByClerkUserId(
        clerkUserId,
      );

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    const campaign =
      await this.fundUsageReportRepository.findCampaignById(campaignId);

    if (!campaign) {
      throw new NotFoundException('Campaign not found.');
    }

    if (campaign.umkmProfileId !== profile.id) {
      throw new NotFoundException('Campaign not found.');
    }

    return this.fundUsageReportRepository.findAllByCampaignId(campaignId);
  }

  async update(clerkUserId: string, id: string, data: UpdateFundUsageInput) {
    const report = await this.fundUsageReportRepository.findById(id);

    if (!report) {
      throw new NotFoundException('Fund usage report not found.');
    }

    const profile =
      await this.fundUsageReportRepository.findUmkmProfileByClerkUserId(
        clerkUserId,
      );

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    const campaign = await this.fundUsageReportRepository.findCampaignById(
      report.campaignId,
    );

    if (!campaign) {
      throw new NotFoundException('Campaign not found.');
    }

    if (campaign.umkmProfileId !== profile.id) {
      throw new NotFoundException('Campaign not found.');
    }

    return this.fundUsageReportRepository.update(id, data);
  }
}
