import { Task } from "@jigjoy-ai/task-contracts"
import spektrumClient from "./spektrum-client"

export async function developModule(task: Task, userId: string): Promise<any> {
	return await spektrumClient.ai.developModule(task, userId)
}

export async function deployModule(projectId: string): Promise<{ moduleId: string; publicAppUrl: string }> {
	return await spektrumClient.ai.deployModule(projectId)
}
