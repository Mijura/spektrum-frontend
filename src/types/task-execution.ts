export enum TaskExecutionStatus {
	RUNNING = "Running",
	SUCCEEDED = "Succeeded",
	FAILED = "Failed",
}

export enum WorkflowId {
	FRONTEND_DEVELOPMENT = "Frontend Development",
}

export type TaskExecutionDetails = {
	id: string
	projectId: string
	taskId: string
	occurredAt: string
	message: string
	phase: string
	status: TaskExecutionStatus
	workflowId: WorkflowId
	title: string
}
