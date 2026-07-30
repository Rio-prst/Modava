import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller.js';
import { NotificationService } from './notification.service.js';
import { NotificationRepository } from './notification.repository.js';
import { INotificationRepository } from './interfaces/notification.repository.interface.js';
import { INotificationService } from './interfaces/notification.service.interface.js';

@Module({
  controllers: [NotificationController],
  providers: [
    { provide: INotificationService, useClass: NotificationService },
    { provide: INotificationRepository, useClass: NotificationRepository },
  ],
  exports: [INotificationService],
})
export class NotificationModule {}
