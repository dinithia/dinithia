import { Injectable, NotFoundException } from "@nestjs/common";
import { createId } from "../../common/id";
import type { CreateTenantDto, Tenant, UpdateTenantDto } from "./tenants.types";

@Injectable()
export class TenantsService {
  private readonly tenants = new Map<string, Tenant>();

  list(): Tenant[] {
    return [...this.tenants.values()];
  }

  get(id: string): Tenant {
    const tenant = this.tenants.get(id);
    if (!tenant) {
      throw new NotFoundException(`Tenant ${id} not found`);
    }
    return tenant;
  }

  create(dto: CreateTenantDto): Tenant {
    const now = new Date().toISOString();
    const tenant: Tenant = {
      id: createId("ten"),
      name: dto.name,
      slug: dto.slug,
      status: "active",
      createdAt: now,
      updatedAt: now,
    };
    this.tenants.set(tenant.id, tenant);
    return tenant;
  }

  update(id: string, dto: UpdateTenantDto): Tenant {
    const existing = this.get(id);
    const updated: Tenant = {
      ...existing,
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    this.tenants.set(id, updated);
    return updated;
  }
}
