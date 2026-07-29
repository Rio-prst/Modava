import type {
  CreateNotificationInput,
  NotificationResponse,
} from './notification.repository.interface.js';

export const INotificationService = Symbol('INotificationService');

export interface INotificationService {
  findAll(clerkUserId: string): Promise<NotificationResponse[]>;
  getUnreadCount(clerkUserId: string): Promise<number>;
  markAsRead(clerkUserId: string, id: string): Promise<void>;
  markAllAsRead(clerkUserId: string): Promise<void>;
  create(data: CreateNotificationInput): Promise<NotificationResponse>;
}
