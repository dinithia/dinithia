import { Injectable, NotFoundException } from "@nestjs/common";
import { createId } from "../../common/id";
import type {
  CreateCustomerDto,
  Customer,
  UpdateCustomerDto,
} from "./customers.types";

@Injectable()
export class CustomersService {
  private readonly customers = new Map<string, Customer>();

  list(tenantId?: string): Customer[] {
    const items = [...this.customers.values()];
    return tenantId ? items.filter((c) => c.tenantId === tenantId) : items;
  }

  get(id: string): Customer {
    const customer = this.customers.get(id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return customer;
  }

  create(dto: CreateCustomerDto): Customer {
    const now = new Date().toISOString();
    const customer: Customer = {
      id: createId("cus"),
      tenantId: dto.tenantId,
      name: dto.name,
      email: dto.email,
      status: "active",
      createdAt: now,
      updatedAt: now,
    };
    this.customers.set(customer.id, customer);
    return customer;
  }

  update(id: string, dto: UpdateCustomerDto): Customer {
    const existing = this.get(id);
    const updated: Customer = {
      ...existing,
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    this.customers.set(id, updated);
    return updated;
  }
}
