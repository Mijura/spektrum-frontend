import Project from "../types/project"

export interface WorkspaceState {
	projects: Project[]
	activeProject: string
}
