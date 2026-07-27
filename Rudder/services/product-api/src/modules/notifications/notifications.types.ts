export type NotificationChannel = "email" | "sms" | "in_app";
export type NotificationStatus = "queued" | "sent" | "failed";

export interface Notification {
  id: string;
  tenantId: string;
  userId: string;
  channel: NotificationChannel;
  subject: string;
  body: string;
  status: NotificationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotificationDto {
  tenantId: string;
  userId: string;
  channel: NotificationChannel;
  subject: string;
  body: string;
}
