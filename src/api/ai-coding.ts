import { AICodingClient } from "@jigjoy-io/ai-coding-client"
import { Task } from "../types/task"

const AI_CODING_ENDPOINT = process.env.AI_CODING_ENDPOINT || ""

const aiCodingClient = new AICodingClient(AI_CODING_ENDPOINT)

export async function develop(task: Task ): Promise<any> {

    const chatHistory = [{
        role: "user",
        content: task.title,
    }]

    chatHistory.push({
        role: "user",
        content: task.description,
    })

    chatHistory.push(...task.activities.map((activity: any) => {
        return {
            role: activity.role,
            content: activity.content,
        }
    }))
    const input = chatHistory.pop()
	return await aiCodingClient.develop(input?.content || "", chatHistory, task.projectId)
}