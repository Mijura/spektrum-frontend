import { ProjectNotFoundError } from "../util/errors/project-not-found-error"

export const API_HOST = process.env.REACT_APP_API
export const HOSTING_API = process.env.REACT_APP_FRONTEND_STORAGE

interface ChangeRequest {
	id: string
	message: string
	project: any
}

export async function implementRequest(changeRequest: ChangeRequest): Promise<any> {
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(changeRequest),
	}

	const res: any = await fetch(`${API_HOST}/project/implement`, options)
	return await res.json()
}

export async function createNewProject(): Promise<any> {
	const options = {
		method: "POST",
	}

	const res: any = await fetch(`${HOSTING_API}/project/new`, options)
	return await res.json()
}

export async function fetchProject(id: string) {
	const res: any = await fetch(`${HOSTING_API}/project/fetch/${id}`)
	if (res.status == 404) throw new ProjectNotFoundError()
	return await res.json()
}

export async function updateProject(project: any): Promise<any> {
	console.log(project)
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(project),
	}

	const res: any = await fetch(`${HOSTING_API}/project/update`, options)
	return await res.json()
}
