import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CustomersService } from "./customers.service";
import type { CreateCustomerDto, UpdateCustomerDto } from "./customers.types";

@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  list(@Query("tenantId") tenantId?: string) {
    return { items: this.customersService.list(tenantId) };
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.customersService.get(id);
  }

  @Post()
  create(@Body() body: CreateCustomerDto) {
    return this.customersService.create(body);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body: UpdateCustomerDto) {
    return this.customersService.update(id, body);
  }
}
