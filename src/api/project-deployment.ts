import { EnvironmentType, ProjectDeploymentClient } from "@jigjoy-io/project-deployment-client"

const API_GATEWAY = process.env.API_GATEWAY as string

const projectDeploymentClient = new ProjectDeploymentClient(`${API_GATEWAY}/deployment`)

export async function getEntryPoint(projectId: string, environment: EnvironmentType = EnvironmentType.DEV) {
	return await projectDeploymentClient.getEntryPoint(projectId, environment)
}
