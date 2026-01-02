import { EnvironmentType, ProjectDeploymentClient } from "@jigjoy-io/project-deployment-client"

const PROJECT_DEPLOYMENT_ENDPOINT = process.env.PROJECT_DEPLOYMENT_ENDPOINT || ""

const projectDeploymentClient = new ProjectDeploymentClient(PROJECT_DEPLOYMENT_ENDPOINT)

export async function getEntryPoint(projectId: string, environment: EnvironmentType = EnvironmentType.DEV) {
	return await projectDeploymentClient.getEntryPoint(projectId, environment)
}

export async function deploy(projectId: string): Promise<any> {
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			projectId: projectId,
		}),
	}

	const res: any = await fetch(`${PROJECT_DEPLOYMENT_ENDPOINT}/project/deploy`, options)

	return await res.json()
}
