export enum WorkflowStatus {
	RUNNING = "RUNNING",
	SUCCESSED = "SUCCESSED",
	FAILED = "FAILED",
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
