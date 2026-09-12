import { Injectable, NotFoundException } from "@nestjs/common";
import { createId } from "../../common/id";
import type { CreateUserDto, UpdateUserDto, User } from "./users.types";

@Injectable()
export class UsersService {
  private readonly users = new Map<string, User>();

  list(tenantId?: string): User[] {
    const items = [...this.users.values()];
    return tenantId ? items.filter((u) => u.tenantId === tenantId) : items;
  }

  get(id: string): User {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  create(dto: CreateUserDto): User {
    const now = new Date().toISOString();
    const user: User = {
      id: createId("usr"),
      tenantId: dto.tenantId,
      email: dto.email,
      displayName: dto.displayName,
      role: dto.role ?? "member",
      status: "invited",
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(user.id, user);
    return user;
  }

  update(id: string, dto: UpdateUserDto): User {
    const existing = this.get(id);
    const updated: User = {
      ...existing,
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    this.users.set(id, updated);
    return updated;
  }
}
