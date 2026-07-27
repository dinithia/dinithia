export type UserStatus = "invited" | "active" | "suspended";

export interface User {
  id: string;
  tenantId: string;
  email: string;
  displayName: string;
  role: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  tenantId: string;
  email: string;
  displayName: string;
  role?: string;
}

export interface UpdateUserDto {
  displayName?: string;
  role?: string;
  status?: UserStatus;
}
