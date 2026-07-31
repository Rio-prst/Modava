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
      proofUrl: data.proofUrl,
    });

    await this.notificationService.create({
      userId: campaignOwner.userId,
      type: 'PLEDGE_NEW',
      title: 'Pledge baru menunggu verifikasi!',
      message: `Ada pledge sebesar Rp${pledge.amount.toLocaleString()} menunggu verifikasi admin untuk campaign Anda.`,
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

    if (pledge.status !== 'PENDING') {
      throw new BadRequestException('Only pending pledges can be cancelled.');
    }

    await this.pledgeRepository.deletePledge(id);
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

  async findPending() {
    return this.pledgeRepository.findPending();
  }

  async verify(clerkUserId: string, id: string) {
    const admin = await this.pledgeRepository.findUserByClerkUserId(clerkUserId);

    if (!admin) {
      throw new NotFoundException('Admin user not found.');
    }

    const pledge = await this.pledgeRepository.findPledgeById(id);

    if (!pledge) {
      throw new NotFoundException('Pledge not found.');
    }

    if (pledge.status !== 'PENDING') {
      throw new BadRequestException('Only pending pledges can be verified.');
    }

    const verified = await this.pledgeRepository.verify(id, admin.id);

    if (verified.amountRaised >= verified.fundingGoal) {
      await this.pledgeRepository.updateCampaignStatus(
        verified.campaignId,
        'FUNDED',
      );

      const campaignOwner = await this.pledgeRepository.findCampaignOwnerId(
        verified.campaignId,
      );

      if (campaignOwner) {
        await this.notificationService.create({
          userId: campaignOwner.userId,
          type: 'TARGET_REACHED',
          title: 'Target campaign tercapai!',
          message: `Selamat! Campaign Anda telah mencapai target pendanaan sebesar Rp${verified.fundingGoal.toLocaleString()}.`,
          referenceId: verified.id,
          referenceType: 'pledge',
        });
      }
    }

    await this.notificationService.create({
      userId: verified.userId,
      type: 'PLEDGE_VERIFIED',
      title: 'Pledge Anda terverifikasi!',
      message: `Pledge Anda sebesar Rp${verified.amount.toLocaleString()} telah terverifikasi. Terima kasih atas dukungan Anda!`,
      referenceId: verified.id,
      referenceType: 'pledge',
    });

    return verified;
  }

  async reject(id: string, reason?: string) {
    const pledge = await this.pledgeRepository.findPledgeById(id);

    if (!pledge) {
      throw new NotFoundException('Pledge not found.');
    }

    if (pledge.status !== 'PENDING') {
      throw new BadRequestException('Only pending pledges can be rejected.');
    }

    const rejected = await this.pledgeRepository.reject(id, reason);

    await this.notificationService.create({
      userId: rejected.userId,
      type: 'PLEDGE_REJECTED',
      title: 'Pledge Anda ditolak',
      message: reason
        ? `Pledge Anda ditolak dengan alasan: ${reason}`
        : 'Pledge Anda ditolak oleh admin.',
      referenceId: rejected.id,
      referenceType: 'pledge',
    });

    return rejected;
  }
}
