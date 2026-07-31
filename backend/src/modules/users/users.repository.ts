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
    const adminEmails = (process.env['ADMIN_EMAILS'] ?? '')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter((email) => email.length > 0);

    const isAdmin = adminEmails.includes((data.email ?? '').toLowerCase());

    const updateData: {
      email: string;
      name: string | null;
      avatarUrl: string | null;
      role?: 'ADMIN';
    } = {
      email: data.email,
      name: data.name,
      avatarUrl: data.avatarUrl,
    };

    if (isAdmin) {
      updateData.role = 'ADMIN';
    }

    return this.prisma.user.upsert({
      where: { clerkUserId },
      update: updateData,
      create: {
        clerkUserId,
        email: data.email,
        name: data.name,
        avatarUrl: data.avatarUrl,
        role: isAdmin ? 'ADMIN' : 'CONTRIBUTOR',
      },
    });
  }
}
