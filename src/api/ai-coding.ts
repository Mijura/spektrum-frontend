import { AICodingClient } from "@jigjoy-io/ai-coding-client"
import { Task } from "@jigjoy-io/task-contracts"

const API_GATEWAY = process.env.API_GATEWAY as string

const aiCodingClient = new AICodingClient(`${API_GATEWAY}/ai`)

export async function develop(task: Task, userId: string): Promise<any> {
	return await aiCodingClient.develop(task, userId)
}

export async function deployToProduction(projectId: string): Promise<{ moduleId: string; publicAppUrl: string }> {
	return await aiCodingClient.deployToProduction(projectId)
}
