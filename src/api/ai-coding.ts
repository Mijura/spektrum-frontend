import { AICodingClient } from "@jigjoy-io/ai-coding-client"
import { Task } from "@jigjoy-io/task-contracts"

const API_GATEWAY = process.env.API_GATEWAY as string

const aiCodingClient = new AICodingClient(`${API_GATEWAY}`)

export async function developModule(task: Task, userId: string): Promise<any> {
	return await aiCodingClient.develop(task, userId)
}

export async function deployModule(projectId: string): Promise<{ moduleId: string; publicAppUrl: string }> {
	return await aiCodingClient.deployToProduction(projectId)
}
