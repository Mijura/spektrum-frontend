export enum WorkflowStatus {
	RUNNING = "Running",
	SUCCEEDED = "Succeeded",
	FAILED = "Failed",
}

export enum WorkflowId {
	Prototyping = "Prototyping",
}

export type WorkflowRunDetails = {
	id: string
	projectId: string
	issueId: string
	occurredAt: string
	message: string
	phase: string
	status: WorkflowStatus
	workflowId: WorkflowId
	title: string
}
