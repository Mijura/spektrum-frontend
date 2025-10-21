import { Task } from "../types/task"

const PLANNING_ENDPOINT = process.env.PLANNING_ENDPOINT

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

	const res: any = await fetch(`${PLANNING_ENDPOINT}/task`, options)
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

	const res: any = await fetch(`${PLANNING_ENDPOINT}/task/title`, options)
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

	const res: any = await fetch(`${PLANNING_ENDPOINT}/task/description`, options)
	return await res.json()
}

export async function fetchAllTasks(projectId: string) {
	const res: any = await fetch(`${PLANNING_ENDPOINT}/task/fetch-all/${projectId}`)
	return await res.json()
}
