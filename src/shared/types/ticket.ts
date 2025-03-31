export default interface Project {
	id?: string
	name?: string
	description?: string
	owner?: any
	tickets?: Ticket[]
}

export interface Ticket {
	id: string
	title: string
	description: string
	projectId: string
	status: "TODO" | "IN_PROGRESS" | "DONE"
	created: string
	updated: string
}
