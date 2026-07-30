import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type {
  UpsertUserData,
  IUsersRepository,
} from './interfaces/users.repository.interface.js';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByClerkUserId(clerkUserId: string) {
    return this.prisma.user.findUnique({
      where: { clerkUserId },
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  upsert(clerkUserId: string, data: UpsertUserData) {
    return this.prisma.user.upsert({
      where: { clerkUserId },
      update: {
        email: data.email,
        name: data.name,
        avatarUrl: data.avatarUrl,
      },
      create: {
        clerkUserId,
        email: data.email,
        name: data.name,
        avatarUrl: data.avatarUrl,
        role: 'CONTRIBUTOR',
      },
    });
  }
}
