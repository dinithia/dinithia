export type CustomerStatus = "active" | "inactive";

export interface Customer {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  status: CustomerStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerDto {
  tenantId: string;
  name: string;
  email: string;
}

export interface UpdateCustomerDto {
  name?: string;
  email?: string;
  status?: CustomerStatus;
}
