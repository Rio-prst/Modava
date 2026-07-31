export type NotificationType =
  | 'PLEDGE_NEW'
  | 'PLEDGE_VERIFIED'
  | 'PLEDGE_REJECTED'
  | 'TARGET_REACHED'
  | 'CAMPAIGN_ENDED'
  | 'LEGALITAS_VERIFIED'
  | 'LEGALITAS_REJECTED'
  | 'SCORE_UPDATED';

export interface CreateNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  message?: string;
  referenceId?: string;
  referenceType?: string;
}

export interface NotificationResponse {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string | null;
  isRead: boolean;
  referenceId: string | null;
  referenceType: string | null;
  createdAt: Date;
}

export interface LocalUser {
  id: string;
}

export const INotificationRepository = Symbol('INotificationRepository');

export interface INotificationRepository {
  findUserByClerkUserId(clerkUserId: string): Promise<LocalUser | null>;
  findAllByUserId(userId: string): Promise<NotificationResponse[]>;
  findById(id: string): Promise<NotificationResponse | null>;
  getUnreadCount(userId: string): Promise<number>;
  create(data: CreateNotificationInput): Promise<NotificationResponse>;
  markAsRead(id: string): Promise<void>;
  markAllAsRead(userId: string): Promise<void>;
}
