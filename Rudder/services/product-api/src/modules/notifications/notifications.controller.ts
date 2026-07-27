import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import type { CreateNotificationDto } from "./notifications.types";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  list(@Query("tenantId") tenantId?: string) {
    return { items: this.notificationsService.list(tenantId) };
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.notificationsService.get(id);
  }

  @Post()
  create(@Body() body: CreateNotificationDto) {
    return this.notificationsService.create(body);
  }
}
