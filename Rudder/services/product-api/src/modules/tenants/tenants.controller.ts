import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { TenantsService } from "./tenants.service";
import type { CreateTenantDto, UpdateTenantDto } from "./tenants.types";

@Controller("tenants")
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get()
  list() {
    return { items: this.tenantsService.list() };
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.tenantsService.get(id);
  }

  @Post()
  create(@Body() body: CreateTenantDto) {
    return this.tenantsService.create(body);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body: UpdateTenantDto) {
    return this.tenantsService.update(id, body);
  }
}
