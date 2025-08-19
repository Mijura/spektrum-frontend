import { WorkflowId } from "../types/task-execution"

const HONEYCOMB_ENDPOINT = process.env.HONEYCOMB_ENDPOINT

export async function runTaskExecution(taskId: string, accountId: string): Promise<any> {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			taskId: taskId,
			workflowId: WorkflowId.FRONTEND_DEVELOPMENT,
			accountId: accountId,
		}),
	}

	const res: any = await fetch(`${HONEYCOMB_ENDPOINT}/task-execution/develop`, options)

	return await res.json()
}

export async function reRunTaskExecution(comment: any) {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			taskId: comment.taskId,
			authorId: comment.authorId,
			commentText: comment.commentText,
		}),
	}

	const res: any = await fetch(`${HONEYCOMB_ENDPOINT}/task-execution/comment-and-develop`, options)
	return await res.json()
}

export async function fetchProjectTimeline(projectId: string, page: number = 1, size: number = 5) {
	const url = new URL(`${HONEYCOMB_ENDPOINT}/task-execution/project/timeline`)
	url.searchParams.append("projectId", projectId)
	url.searchParams.append("page", String(page)) // Convert page to string if it's a number
	url.searchParams.append("size", String(size))

	const res: any = await fetch(url)
	return await res.json()
}

export async function fetchAccountTimeline(accountId: string, page: number = 1, size: number = 5) {
	const url = new URL(`${HONEYCOMB_ENDPOINT}/task-execution/account/timeline`)
	url.searchParams.append("accountId", accountId)
	url.searchParams.append("page", String(page))
	url.searchParams.append("size", String(size))

	const res: any = await fetch(url)
	return await res.json()
}

export async function fetchHeatmap(accountId: string) {
	const url = new URL(`${HONEYCOMB_ENDPOINT}/task-execution/heatmap`)
	url.searchParams.append("accountId", accountId)
	url.searchParams.append("startDate", "2025-01-01")
	url.searchParams.append("endDate", "2025-12-31")

	const res: any = await fetch(url)
	return await res.json()
}
