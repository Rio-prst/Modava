import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { createClerkClient, verifyToken } from '@clerk/backend';
import type { ClerkClient } from '@clerk/backend';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { AuthenticatedRequest } from '../types/api-response.js';

let clerkClient: ClerkClient | null = null;

function getClerkClient(): ClerkClient {
  if (!clerkClient) {
    clerkClient = createClerkClient({
      secretKey: process.env['CLERK_SECRET_KEY'],
    });
  }
  return clerkClient;
}

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid Authorization header format');
    }

    try {
      const payload = await verifyToken(token, {
        secretKey: process.env['CLERK_SECRET_KEY'],
      });

      const clerkUserId = payload['sub'];
      if (!clerkUserId || typeof clerkUserId !== 'string') {
        throw new UnauthorizedException('Invalid token payload');
      }

      const clerkUser = await getClerkClient().users.getUser(clerkUserId);

      const email =
        clerkUser.emailAddresses[0]?.emailAddress ?? '';
      const name =
        clerkUser.firstName || clerkUser.lastName
          ? `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim()
          : null;
      const avatarUrl = clerkUser.imageUrl ?? null;

      const localUser = await this.prisma.user.findUnique({
        where: { clerkUserId },
      });

      request.user = {
        id: localUser?.id ?? '',
        clerkUserId,
        email,
        name,
        avatarUrl,
        role: localUser?.role ?? 'CONTRIBUTOR',
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
