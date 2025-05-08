export type CommentLeftMetadata = {
	commentId: string
	commentText: string
	edited: boolean
	lastEditedAt: string | null
}

export type TitleUpdatedMetadata = {
	message: string
	oldTitle: string
	newTitle: string
}

export type TaskCreatedMetadata = {
	message: string
	title: string
	description: string
}

export type DescriptionUpdatedMetadata = {
	message: string
	oldDescription: string
	newDescription: string
}

export enum WorkflowRunStatus {
	RUNNING = "Running",
	SUCCEEDED = "Succeeded",
	FAILED = "Failed",
}

export type StartedWorkMetadata = {
	message: string
	workerId: string
	phase: string
}

export type FinishedWorkMetadata = {
	message: string
	workerId: string
	phase: string
}

export type WorkflowRunMetadata = {
	workflowId: string
	status: WorkflowRunStatus
	message: string
	phase: string
	title: string
	error?: string
}

export type ActivityMetadata =
	| CommentLeftMetadata
	| TitleUpdatedMetadata
	| DescriptionUpdatedMetadata
	| TaskCreatedMetadata
	| StartedWorkMetadata
	| FinishedWorkMetadata
	| WorkflowRunMetadata

export enum ActivityType {
	TASK_CREATED = "TaskCreated",
	COMMENT_LEFT = "CommentLeft",
	TITLE_UPDATED = "TitleUpdated",
	DESCRIPTION_UPDATED = "DescriptionUpdated",
	WORKFLOW_RUN = "WorkflowRun",
	STARTED_WORK = "StartedWork",
	FINISHED_WORK = "FinishedWork",
}

export type PaginationData = {
	pageNumber: number
	pageSize: number
}

export const DefaultPagination: PaginationData = {
	pageNumber: 1,
	pageSize: 5,
}

export type TimeRangeData = {
	startDate: string
	endDate: string
}

export type ActivityData = {
	id: string
	type: ActivityType
	projectId: string
	taskId: string
	userId: string
	metadata: ActivityMetadata
	occurredAt: string
}
