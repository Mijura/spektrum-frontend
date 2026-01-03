import { ProjectNotFoundError } from "../shared/errors/project-not-found-error"
import { Task } from "@jigjoy-io/task-contracts"

const PROJECT_PLANNING_ENDPOINT = process.env.PROJECT_PLANNING_ENDPOINT

export async function archiveProject(projectId: string): Promise<any> {
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			projectId: projectId,
		}),
	}

	const res: any = await fetch(`${PROJECT_PLANNING_ENDPOINT}/project/archive`, options)

	return await res.json()
}

export async function createNewProject(owner: string): Promise<any> {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			owner: owner,
		}),
	}

	const res: any = await fetch(`${PROJECT_PLANNING_ENDPOINT}/project`, options)
	return await res.json()
}

export async function planTasksWithAI(projectId: string, projectDescription: string): Promise<Task[]> {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			projectId: projectId,
			projectDescription: projectDescription,
		}),
	}

	const res: any = await fetch(`${PROJECT_PLANNING_ENDPOINT}/project/plan-tasks`, options)
	return await res.json()
}

export async function updateProjectDetails(id: string, name: string, description: string): Promise<any> {
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			id: id,
			name: name,
			description: description,
		}),
	}

	const res: any = await fetch(`${PROJECT_PLANNING_ENDPOINT}/project`, options)
	return await res.json()
}

export async function fetchProject(id: string) {
	const res: any = await fetch(`${PROJECT_PLANNING_ENDPOINT}/project/fetch/${id}`)
	if (res.status == 404) throw new ProjectNotFoundError()
	return await res.json()
}

export async function fetchAllProjects(owner: string) {
	const res: any = await fetch(`${PROJECT_PLANNING_ENDPOINT}/project/fetch-all/${owner}`)
	return await res.json()
}

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

	const res: any = await fetch(`${PROJECT_PLANNING_ENDPOINT}/task`, options)
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

	const res: any = await fetch(`${PROJECT_PLANNING_ENDPOINT}/task/title`, options)
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

	const res: any = await fetch(`${PROJECT_PLANNING_ENDPOINT}/task/description`, options)
	return await res.json()
}

export async function fetchAllTasks(projectId: string) {
	const res: any = await fetch(`${PROJECT_PLANNING_ENDPOINT}/task/fetch-all/${projectId}`)
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
	const res: any = await fetch(`${PROJECT_PLANNING_ENDPOINT}/task/leave-comment`, options)
	return await res.json()
}
