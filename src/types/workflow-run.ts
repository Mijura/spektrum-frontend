export enum WorkflowStatus {
	RUNNING = "Running",
	SUCCESSED = "Successed",
	FAILED = "Failed",
}

export enum WorkflowId {
	Prototyping = "Prototyping",
}

export type WorkflowRunData = {
	id: string
	projectId: string
	issueId: string
	occurredAt: string
	metadata: {
		message: string
		phase: string
		status: WorkflowStatus
		workflowId: WorkflowId
		title: string
	}
}
