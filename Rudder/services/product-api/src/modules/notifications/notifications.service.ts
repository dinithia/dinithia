import { Injectable, NotFoundException } from "@nestjs/common";
import { createId } from "../../common/id";
import type {
  CreateNotificationDto,
  Notification,
} from "./notifications.types";

@Injectable()
export class NotificationsService {
  private readonly notifications = new Map<string, Notification>();

  list(tenantId?: string): Notification[] {
    const items = [...this.notifications.values()];
    return tenantId ? items.filter((n) => n.tenantId === tenantId) : items;
  }

  get(id: string): Notification {
    const notification = this.notifications.get(id);
    if (!notification) {
      throw new NotFoundException(`Notification ${id} not found`);
    }
    return notification;
  }

  create(dto: CreateNotificationDto): Notification {
    const now = new Date().toISOString();
    const notification: Notification = {
      id: createId("ntf"),
      tenantId: dto.tenantId,
      userId: dto.userId,
      channel: dto.channel,
      subject: dto.subject,
      body: dto.body,
      status: "queued",
      createdAt: now,
      updatedAt: now,
    };
    this.notifications.set(notification.id, notification);
    return notification;
  }
}
