export enum TaskStatus {
	TODO = "Todo",
	IN_PROGRESS = "In Progress",
	DONE = "Done",
}

export interface Task {
	id: string
	title: string
	description: string
	projectId: string
	status: TaskStatus
	created: string
	updated: string
}
export default interface Project {
	id?: string
	name?: string
	description?: string
	owner?: any
	tasks?: Task[]
}
