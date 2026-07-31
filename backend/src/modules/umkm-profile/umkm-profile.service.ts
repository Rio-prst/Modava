import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { IUmkmProfileRepository } from './interfaces/umkm-profile.repository.interface.js';
import type {
  CreateUmkmProfileInput,
  UpdateUmkmProfileInput,
} from './interfaces/umkm-profile.repository.interface.js';
import { IUmkmProfileService } from './interfaces/umkm-profile.service.interface.js';

@Injectable()
export class UmkmProfileService implements IUmkmProfileService {
  constructor(
    @Inject(IUmkmProfileRepository)
    private readonly umkmProfileRepository: IUmkmProfileRepository,
  ) {}

  async create(clerkUserId: string, data: CreateUmkmProfileInput) {
    const user =
      await this.umkmProfileRepository.findUserByClerkId(clerkUserId);

    if (!user) {
      throw new NotFoundException('User not found. Sync user first.');
    }

    const existing = await this.umkmProfileRepository.findByUserId(user.id);

    if (existing) {
      throw new ConflictException('UMKM profile already exists');
    }

    return this.umkmProfileRepository.create(user.id, data);
  }

  async findByClerkUserId(clerkUserId: string) {
    const user =
      await this.umkmProfileRepository.findUserByClerkId(clerkUserId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const profile = await this.umkmProfileRepository.findByUserId(user.id);

    if (!profile) {
      throw new NotFoundException('UMKM profile not found');
    }

    return profile;
  }

  async update(clerkUserId: string, data: UpdateUmkmProfileInput) {
    const user =
      await this.umkmProfileRepository.findUserByClerkId(clerkUserId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existing = await this.umkmProfileRepository.findByUserId(user.id);

    if (!existing) {
      throw new NotFoundException('UMKM profile not found');
    }

    return this.umkmProfileRepository.update(user.id, data);
  }
}
