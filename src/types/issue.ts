export interface Issue {
	id: string
	title: string
	description: string
	projectId: string
	status: "TODO" | "IN_PROGRESS" | "DONE"
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
