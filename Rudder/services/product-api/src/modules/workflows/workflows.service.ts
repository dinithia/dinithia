import { Injectable, NotFoundException } from "@nestjs/common";
import { createId } from "../../common/id";
import type {
  CreateWorkflowDto,
  UpdateWorkflowDto,
  Workflow,
} from "./workflows.types";

@Injectable()
export class WorkflowsService {
  private readonly workflows = new Map<string, Workflow>();

  list(tenantId?: string): Workflow[] {
    const items = [...this.workflows.values()];
    return tenantId ? items.filter((w) => w.tenantId === tenantId) : items;
  }

  get(id: string): Workflow {
    const workflow = this.workflows.get(id);
    if (!workflow) {
      throw new NotFoundException(`Workflow ${id} not found`);
    }
    return workflow;
  }

  create(dto: CreateWorkflowDto): Workflow {
    const now = new Date().toISOString();
    const workflow: Workflow = {
      id: createId("wf"),
      tenantId: dto.tenantId,
      name: dto.name,
      description: dto.description ?? "",
      status: "draft",
      steps: dto.steps ?? [],
      createdAt: now,
      updatedAt: now,
    };
    this.workflows.set(workflow.id, workflow);
    return workflow;
  }

  update(id: string, dto: UpdateWorkflowDto): Workflow {
    const existing = this.get(id);
    const updated: Workflow = {
      ...existing,
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    this.workflows.set(id, updated);
    return updated;
  }
}
