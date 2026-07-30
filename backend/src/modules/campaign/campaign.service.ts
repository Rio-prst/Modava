import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { ICampaignRepository } from './interfaces/campaign.repository.interface.js';
import type {
  CreateCampaignInput,
  UpdateCampaignInput,
} from './interfaces/campaign.repository.interface.js';
import { ICampaignService } from './interfaces/campaign.service.interface.js';
import type {
  PublicCampaignFilter,
  PublicCampaignDetail,
  UploadCampaignMediaInput,
} from './interfaces/campaign.service.interface.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MIN_CASHFLOW_SUMMARIES } from '../../common/constants.js';

interface CampaignDocumentInfo {
  status: string;
}

function hasLegalitasStatus(
  campaign: { umkmProfile?: { legalitasDocuments: CampaignDocumentInfo[] } },
  target: 'LENGKAP' | 'SEBAGIAN' | 'BELUM',
): boolean {
  const docs = campaign.umkmProfile?.legalitasDocuments ?? [];
  if (docs.length === 0) {
    return target === 'BELUM';
  }
  const verifiedCount = docs.filter((d) => d.status === 'VERIFIED').length;
  if (target === 'LENGKAP') {
    return verifiedCount === docs.length;
  }
  if (target === 'SEBAGIAN') {
    return verifiedCount > 0 && verifiedCount < docs.length;
  }
  return target === 'BELUM';
}

@Injectable()
export class CampaignService implements ICampaignService {
  constructor(
    @Inject(ICampaignRepository)
    private readonly campaignRepository: ICampaignRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(clerkUserId: string, data: CreateCampaignInput) {
    const profile =
      await this.campaignRepository.findUmkmProfileByClerkUserId(clerkUserId);

    if (!profile) {
      throw new NotFoundException(
        'UMKM profile not found. Create profile first.',
      );
    }

    const summaryCount = await this.prisma.cashFlowMonthlySummary.count({
      where: { umkmProfileId: profile.id },
    });

    if (summaryCount < MIN_CASHFLOW_SUMMARIES) {
      throw new BadRequestException(
        'Minimum 1 bulan riwayat arus kas diperlukan sebelum membuat campaign. Catat transaksi keuangan Anda terlebih dahulu.',
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

  async findAllPublic(filter?: PublicCampaignFilter) {
    const whereCategory = filter?.categoryId
      ? { umkmProfile: { categoryId: filter.categoryId } }
      : {};

    const whereMinScore =
      filter?.minScore !== undefined
        ? {
            umkmProfile: {
              creditScores: {
                some: { overallScore: { gte: filter.minScore } },
              },
            },
          }
        : {};

    const campaigns = await this.prisma.campaign.findMany({
      where: {
        status: filter?.status ?? 'ACTIVE',
        ...whereCategory,
        ...whereMinScore,
      },
      include: {
        umkmProfile: {
          select: {
            businessName: true,
            city: true,
            categoryId: true,
            category: { select: { name: true } },
            creditScores: {
              orderBy: { calculatedAt: 'desc' },
              take: 1,
              select: { overallScore: true, tier: true },
            },
            legalitasDocuments: {
              select: { status: true },
            },
          },
        },
        _count: { select: { pledges: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const legalitasStatus = filter?.legalitasStatus;
    if (legalitasStatus === undefined) {
      return campaigns;
    }

    return campaigns.filter((campaign) =>
      hasLegalitasStatus(campaign, legalitasStatus),
    );
  }

  async uploadMedia(
    clerkUserId: string,
    campaignId: string,
    data: UploadCampaignMediaInput,
  ) {
    const profile =
      await this.campaignRepository.findUmkmProfileByClerkUserId(clerkUserId);

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    const campaign = await this.campaignRepository.findById(campaignId);

    if (!campaign) {
      throw new NotFoundException('Campaign not found.');
    }

    if (campaign.umkmProfileId !== profile.id) {
      throw new NotFoundException('Campaign not found.');
    }

    if (data.isPrimary) {
      const existing = await this.prisma.campaignMedia.findFirst({
        where: { campaignId, isPrimary: true },
      });

      if (existing) {
        throw new ConflictException(
          'A primary media already exists for this campaign.',
        );
      }
    }

    return this.campaignRepository.createMedia({
      campaignId,
      fileUrl: data.fileUrl,
      fileType: data.fileType,
      isPrimary: data.isPrimary,
    });
  }

  async findPublicById(id: string): Promise<PublicCampaignDetail> {
    const result = await this.prisma.campaign.findUnique({
      where: { id },
      include: {
        umkmProfile: {
          select: {
            businessName: true,
            city: true,
            categoryId: true,
            category: { select: { name: true } },
            creditScores: {
              orderBy: { calculatedAt: 'desc' },
              take: 1,
              select: { overallScore: true, tier: true },
            },
          },
        },
        _count: { select: { pledges: true } },
      },
    });

    if (!result) {
      throw new NotFoundException('Campaign not found.');
    }

    if (result.status === 'DRAFT') {
      throw new NotFoundException('Campaign not found.');
    }

    const creditScore =
      result.umkmProfile.creditScores.length > 0
        ? result.umkmProfile.creditScores[0]
        : null;

    return {
      id: result.id,
      title: result.title,
      description: result.description,
      fundingGoal: Number(result.fundingGoal),
      amountRaised: Number(result.amountRaised),
      status: result.status,
      startDate: result.startDate,
      endDate: result.endDate,
      createdAt: result.createdAt,
      umkmProfile: {
        businessName: result.umkmProfile.businessName,
        city: result.umkmProfile.city,
        categoryId: result.umkmProfile.categoryId,
        category: result.umkmProfile.category,
      },
      creditScore: creditScore
        ? {
            overallScore: creditScore.overallScore,
            tier: creditScore.tier,
          }
        : null,
      pledgeCount: result._count.pledges,
    };
  }
}
