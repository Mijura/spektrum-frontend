import { ProjectNotFoundError } from "../shared/errors/project-not-found-error"

const HONEYCOMB_ENDPOINT = process.env.HONEYCOMB_ENDPOINT

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

	const res: any = await fetch(`${HONEYCOMB_ENDPOINT}/deploy`, options)

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

	const res: any = await fetch(`${HONEYCOMB_ENDPOINT}/archive`, options)

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

	const res: any = await fetch(`${HONEYCOMB_ENDPOINT}`, options)
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

	const res: any = await fetch(`${HONEYCOMB_ENDPOINT}`, options)
	return await res.json()
}

export async function fetchProject(id: string) {
	const res: any = await fetch(`${HONEYCOMB_ENDPOINT}/fetch/${id}`)
	if (res.status == 404) throw new ProjectNotFoundError()
	return await res.json()
}

export async function fetchAllProjects(owner: string) {
	const res: any = await fetch(`${HONEYCOMB_ENDPOINT}/fetch-all/${owner}`)
	return await res.json()
}
