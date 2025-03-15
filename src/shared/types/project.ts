export default interface Project {
	id?: string
	name?: string
	description?: string
	imageUrl?: string
	sourceCode?: any
	creator?: any
	chatHistory: any[]
}

export interface ProjectState {
	project: Project
}
