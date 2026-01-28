import { EnvironmentType } from "@jigjoy-io/platform-sdk"
import jigjoyClient from "./platform-sdk"

export async function getEntryPoint(projectId: string, environment: EnvironmentType = EnvironmentType.DEV) {
	return await jigjoyClient.deployment.getEntryPoint(projectId, environment)
}
