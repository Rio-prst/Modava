import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyToken } from '@clerk/backend';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { AuthenticatedRequest } from '../types/api-response.js';

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

      const email =
        typeof payload['email'] === 'string' ? payload['email'] : '';
      const name = typeof payload['name'] === 'string' ? payload['name'] : null;
      const avatarUrl =
        typeof payload['picture'] === 'string' ? payload['picture'] : null;

      const localUser = await this.prisma.user.findUnique({
        where: { clerkUserId },
      });

      if (localUser) {
        request.user = {
          id: localUser.id,
          clerkUserId: localUser.clerkUserId,
          email: localUser.email,
          name: localUser.name,
          avatarUrl: localUser.avatarUrl,
          role: localUser.role,
        };
      } else {
        request.user = {
          id: '',
          clerkUserId,
          email,
          name,
          avatarUrl,
          role: 'CONTRIBUTOR',
        };
      }

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
