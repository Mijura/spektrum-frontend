import { ProjectNotFoundError } from "../shared/errors/project-not-found-error"

export const PROJECT_MANAGEMENT_API = process.env.REACT_APP_PROJECT_MANAGEMENT_API

interface ChangeRequest {
	projectId: string
	message: string
}

export async function develop(changeRequest: ChangeRequest): Promise<any> {
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(changeRequest),
	}

	const res: any = await fetch(`${PROJECT_MANAGEMENT_API}/develop`, options)
	return await res.json()
}

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

	const res: any = await fetch(`${PROJECT_MANAGEMENT_API}/deploy`, options)

	return await res.json()
}

export async function createNewProject(): Promise<any> {
	const options = {
		method: "POST",
	}

	const res: any = await fetch(`${PROJECT_MANAGEMENT_API}`, options)
	return await res.json()
}

export async function fetchProject(id: string) {
	const res: any = await fetch(`${PROJECT_MANAGEMENT_API}/fetch/${id}`)
	if (res.status == 404) throw new ProjectNotFoundError()
	return await res.json()
}
