import { Task } from "@jigjoy-io/task-contracts"
import jigjoyClient from "./platform-sdk"

export async function developModule(task: Task, userId: string): Promise<any> {
	return await jigjoyClient.ai.developModule(task, userId)
}

export async function deployModule(projectId: string): Promise<{ moduleId: string; publicAppUrl: string }> {
	return await jigjoyClient.ai.deployModule(projectId)
}
