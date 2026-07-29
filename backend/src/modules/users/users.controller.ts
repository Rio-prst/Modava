import { Controller, Post, Get, Req, UseGuards, Inject } from '@nestjs/common';
import { ClerkAuthGuard } from '../../common/guards/clerk-auth.guard.js';
import type { AuthenticatedRequest } from '../../common/types/api-response.js';
import { IUsersService } from './interfaces/users.service.interface.js';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(IUsersService) private readonly usersService: IUsersService,
  ) {}

  @Post('sync')
  @UseGuards(ClerkAuthGuard)
  async sync(@Req() req: AuthenticatedRequest) {
    const user = await this.usersService.sync(
      req.user.clerkUserId,
      req.user.email,
      req.user.name,
      req.user.avatarUrl,
    );

    return { data: user };
  }

  @Get('me')
  @UseGuards(ClerkAuthGuard)
  async me(@Req() req: AuthenticatedRequest) {
    const user = await this.usersService.findByClerkUserId(
      req.user.clerkUserId,
    );

    return { data: user };
  }
}
