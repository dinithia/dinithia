import { Injectable, NotFoundException } from "@nestjs/common";
import { createId } from "../../common/id";
import type { AuditEvent, CreateAuditEventDto } from "./audit.types";

@Injectable()
export class AuditService {
  private readonly events: AuditEvent[] = [];

  list(tenantId?: string): AuditEvent[] {
    return tenantId
      ? this.events.filter((event) => event.tenantId === tenantId)
      : [...this.events];
  }

  get(id: string): AuditEvent {
    const event = this.events.find((item) => item.id === id);
    if (!event) {
      throw new NotFoundException(`Audit event ${id} not found`);
    }
    return event;
  }

  record(dto: CreateAuditEventDto): AuditEvent {
    const event: AuditEvent = {
      id: createId("aud"),
      tenantId: dto.tenantId,
      actorId: dto.actorId,
      action: dto.action,
      resourceType: dto.resourceType,
      resourceId: dto.resourceId,
      metadata: dto.metadata ?? {},
      createdAt: new Date().toISOString(),
    };
    this.events.unshift(event);
    return event;
  }
}
