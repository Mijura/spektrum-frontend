import { ProjectNotFoundError } from "../shared/errors/project-not-found-error"
import { Task } from "../types/task"

const PROJECT_PLANNING_ENDPOINT = process.env.PROJECT_PLANNING_ENDPOINT

export async function deploy(projectId: string): Promise<any> {

	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			projectId: projectId,
		}),
	}

	const res: any = await fetch(`${PROJECT_PLANNING_ENDPOINT}/project/deploy`, options)

	return await res.json()
}

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

	const res: any = await fetch(`${PROJECT_PLANNING_ENDPOINT}/project/plan-tasks-with-ai`, options)
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
