import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { WorkflowsService } from "./workflows.service";
import type { CreateWorkflowDto, UpdateWorkflowDto } from "./workflows.types";

@Controller("workflows")
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Get()
  list(@Query("tenantId") tenantId?: string) {
    return { items: this.workflowsService.list(tenantId) };
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.workflowsService.get(id);
  }

  @Post()
  create(@Body() body: CreateWorkflowDto) {
    return this.workflowsService.create(body);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body: UpdateWorkflowDto) {
    return this.workflowsService.update(id, body);
  }
}
