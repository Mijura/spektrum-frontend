import { Task } from "@jigjoy-io/task-contracts"

const API_GATEWAY = process.env.API_GATEWAY || ""

export async function createTask(projectId: string, title: string, description: string): Promise<any> {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			projectId: projectId,
			title: title,
			description: description,
		}),
	}

	const res: any = await fetch(`${API_GATEWAY}/planning/task`, options)
	return await res.json()
}

export async function updateTaskTitle(task: Task) {
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(task),
	}

	const res: any = await fetch(`${API_GATEWAY}/planning/task/title`, options)
	return await res.json()
}

export async function updateTaskDescription(task: Task) {
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(task),
	}

	const res: any = await fetch(`${API_GATEWAY}/planning/task/description`, options)
	return await res.json()
}

export async function fetchAllTasks(projectId: string) {
	const res: any = await fetch(`${API_GATEWAY}/planning/task/fetch-all/${projectId}`)
	return await res.json()
}

export async function leaveComment(taskId: string, commentText: string, authorId: string) {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ taskId: taskId, comment: commentText, authorId: authorId }),
	}
	const res: any = await fetch(`${API_GATEWAY}/planning/task/leave-comment`, options)
	return await res.json()
}
