import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import type { CreateUserDto, UpdateUserDto } from "./users.types";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  list(@Query("tenantId") tenantId?: string) {
    return { items: this.usersService.list(tenantId) };
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.usersService.get(id);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }
}
