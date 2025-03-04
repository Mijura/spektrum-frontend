import { ProjectNotFoundError } from "../shared/errors/project-not-found-error"

export const PROJECT_MANAGEMENT_API = process.env.REACT_APP_PROJECT_MANAGEMENT_API

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

	const res: any = await fetch(`${PROJECT_MANAGEMENT_API}/project/implement`, options)
	return await res.json()
}

export async function createNewProject(): Promise<any> {
	const options = {
		method: "POST",
	}

	const res: any = await fetch(`${PROJECT_MANAGEMENT_API}/project/new`, options)
	return await res.json()
}

export async function fetchProject(id: string) {
	const res: any = await fetch(`${PROJECT_MANAGEMENT_API}/project/fetch/${id}`)
	if (res.status == 404) throw new ProjectNotFoundError()
	return await res.json()
}
