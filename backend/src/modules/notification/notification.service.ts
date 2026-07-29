import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { INotificationRepository } from './interfaces/notification.repository.interface.js';
import type { CreateNotificationInput } from './interfaces/notification.repository.interface.js';
import { INotificationService } from './interfaces/notification.service.interface.js';

@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    @Inject(INotificationRepository)
    private readonly notificationRepository: INotificationRepository,
  ) {}

  async findAll(clerkUserId: string) {
    const user =
      await this.notificationRepository.findUserByClerkUserId(clerkUserId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return this.notificationRepository.findAllByUserId(user.id);
  }

  async getUnreadCount(clerkUserId: string) {
    const user =
      await this.notificationRepository.findUserByClerkUserId(clerkUserId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return this.notificationRepository.getUnreadCount(user.id);
  }

  async markAsRead(clerkUserId: string, id: string) {
    const user =
      await this.notificationRepository.findUserByClerkUserId(clerkUserId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const notification = await this.notificationRepository.findById(id);

    if (!notification) {
      throw new NotFoundException('Notification not found.');
    }

    if (notification.userId !== user.id) {
      throw new NotFoundException('Notification not found.');
    }

    await this.notificationRepository.markAsRead(id);
  }

  async markAllAsRead(clerkUserId: string) {
    const user =
      await this.notificationRepository.findUserByClerkUserId(clerkUserId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    await this.notificationRepository.markAllAsRead(user.id);
  }

  create(data: CreateNotificationInput) {
    return this.notificationRepository.create(data);
  }
}
