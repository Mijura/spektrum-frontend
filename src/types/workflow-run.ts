export enum WorkflowStatus {
	Running = "Running",
	Successed = "Successed",
	Failed = "Failed",
}

export enum WorkflowId {
	Prototyping = "prototyping",
}

export interface WorkflowRun {
	id: string
	projectId: string
	issueId: string
	status: WorkflowStatus
	workflowId: WorkflowId
	occuredAt?: string
}
