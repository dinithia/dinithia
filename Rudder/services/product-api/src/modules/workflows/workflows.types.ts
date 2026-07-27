export type WorkflowStatus = "draft" | "active" | "archived";

export interface Workflow {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  steps: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkflowDto {
  tenantId: string;
  name: string;
  description?: string;
  steps?: string[];
}

export interface UpdateWorkflowDto {
  name?: string;
  description?: string;
  status?: WorkflowStatus;
  steps?: string[];
}
