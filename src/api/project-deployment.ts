import { EnvironmentType } from "@jigjoy-ai/spektrum-client"
import spektrumClient from "./spektrum-client"

export async function getEntryPoint(projectId: string, environment: EnvironmentType = EnvironmentType.DEV) {
	return await spektrumClient.deployment.getEntryPoint(projectId, environment)
}
