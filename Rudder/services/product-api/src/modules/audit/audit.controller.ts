import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { AuditService } from "./audit.service";
import type { CreateAuditEventDto } from "./audit.types";

@Controller("audit")
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  list(@Query("tenantId") tenantId?: string) {
    return { items: this.auditService.list(tenantId) };
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.auditService.get(id);
  }

  @Post()
  record(@Body() body: CreateAuditEventDto) {
    return this.auditService.record(body);
  }
}
