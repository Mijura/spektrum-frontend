export enum WorkflowStatus {
	Running = "Running",
	Done = "Done",
	Failed = "Failed",
}

export enum WorkflowId {
	Prototyping = "prototyping",
}

export interface WorfklowActivityLog {
	id: string
	projectId: string
	ticketId: string
	status: WorkflowStatus
	workflowId: WorkflowId
}
