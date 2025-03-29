export default interface Project {
	id?: string
	name?: string
	description?: string
	imageUrl?: string
	creator?: any
}

export interface ProjectState {
	project: Project
}
