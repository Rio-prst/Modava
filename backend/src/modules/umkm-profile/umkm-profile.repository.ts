import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type {
  CreateUmkmProfileInput,
  UpdateUmkmProfileInput,
  IUmkmProfileRepository,
} from './interfaces/umkm-profile.repository.interface.js';

@Injectable()
export class UmkmProfileRepository implements IUmkmProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserByClerkId(clerkUserId: string) {
    return this.prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true },
    });
  }

  findByUserId(userId: string) {
    return this.prisma.uMKMProfile.findUnique({
      where: { userId },
    });
  }

  create(userId: string, data: CreateUmkmProfileInput) {
    return this.prisma.uMKMProfile.create({
      data: {
        userId,
        ...data,
      },
    });
  }

  update(userId: string, data: UpdateUmkmProfileInput) {
    return this.prisma.uMKMProfile.update({
      where: { userId },
      data,
    });
  }
}
