export enum IssueStatus {
	TODO = "Todo",
	IN_PROGRESS = "In Progress",
	DONE = "Done",
}

export interface Issue {
	id: string
	title: string
	description: string
	projectId: string
	status: IssueStatus
	created: string
	updated: string
}
export default interface Project {
	id?: string
	name?: string
	description?: string
	owner?: any
	issues?: Issue[]
}
