import { Ticket } from "./ticket"

export default interface Project {
	id?: string
	name?: string
	description?: string
	owner?: any
	tickets: Ticket[]
}

export interface ProjectsState {
	projects: Project[]
}
