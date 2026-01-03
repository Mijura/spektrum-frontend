import { AICodingClient } from "@jigjoy-io/ai-coding-client"
import { Task } from "@jigjoy-io/task-contracts"

const AI_CODING_ENDPOINT = process.env.AI_CODING_ENDPOINT || ""

const aiCodingClient = new AICodingClient(AI_CODING_ENDPOINT)

export async function develop(task: Task): Promise<any> {
	return await aiCodingClient.develop(task)
}
