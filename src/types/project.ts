import { Task } from "@jigjoy-io/task-contracts"

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
