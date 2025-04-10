export enum WorkflowStatus {
	Running = "Running",
	Done = "Done",
	Failed = "Failed",
}

export enum WorkflowId {
	CodeGeneration = "code-generation",
}

export interface WorfklowExecution {
	id: string
	projectId: string
	ticketId: string
	status: WorkflowStatus
	workflowId: WorkflowId
}
