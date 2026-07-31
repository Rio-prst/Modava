import {
  Controller,
  Get,
  Patch,
  Param,
  Req,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { ClerkAuthGuard } from '../../common/guards/clerk-auth.guard.js';
import type { AuthenticatedRequest } from '../../common/types/api-response.js';
import { INotificationService } from './interfaces/notification.service.interface.js';

@Controller('notifications')
@UseGuards(ClerkAuthGuard)
export class NotificationController {
  constructor(
    @Inject(INotificationService)
    private readonly notificationService: INotificationService,
  ) {}

  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    const notifications = await this.notificationService.findAll(
      req.user.clerkUserId,
    );
    return { data: notifications };
  }

  @Get('unread-count')
  async getUnreadCount(@Req() req: AuthenticatedRequest) {
    const count = await this.notificationService.getUnreadCount(
      req.user.clerkUserId,
    );
    return { data: count };
  }

  @Patch(':id/read')
  async markAsRead(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    await this.notificationService.markAsRead(req.user.clerkUserId, id);
    return { data: null };
  }

  @Patch('read-all')
  async markAllAsRead(@Req() req: AuthenticatedRequest) {
    await this.notificationService.markAllAsRead(req.user.clerkUserId);
    return { data: null };
  }
}
