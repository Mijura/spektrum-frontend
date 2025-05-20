export enum WorkflowStatus {
	RUNNING = "Running",
	SUCCEEDED = "Succeeded",
	FAILED = "Failed",
}

export enum WorkflowId {
	PROTOTYPING = "Prototyping",
}

export type WorkflowRunDetails = {
	id: string
	projectId: string
	taskId: string
	occurredAt: string
	message: string
	phase: string
	status: WorkflowStatus
	workflowId: WorkflowId
	title: string
}
