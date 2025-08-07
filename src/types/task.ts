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

export interface Version {
	projectId: string
	buildArtifactUrl: string
	sourceCodeUrl: string
	tag: string
	createdAt: string
}

export interface Deployment {
	url: string
	version: Version
}
export default interface Project {
	id?: string
	name?: string
	description?: string
	owner?: any
	latestDevDeployment: Deployment | null
	latestProdDeployment: Deployment | null
	tasks?: Task[]
}
