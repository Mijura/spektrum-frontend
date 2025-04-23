import { ProjectNotFoundError } from "../shared/errors/project-not-found-error"
import { io } from "socket.io-client"
import { WorfklowExecution } from "../types/workflow-execution"

const PROJECT_MANAGEMENT_ENDPOINT = process.env.PROJECT_MANAGEMENT_ENDPOINT

export const runWorkflow = (
	workflowExecution: WorfklowExecution,
	onUpdate: (data: any) => void,
	onDone: (data: any) => void,
	onError: (error: any) => void,
) => {
	const socket = io("http://localhost:3000") //TODO: fix this!

	socket.on("connect", () => {
		socket.emit("run", workflowExecution)
	})

	socket.on("update", (data) => {
		console.log("Received update:", data)
		onUpdate({ ticket: data.ticket })
	})

	socket.on("done", (data) => {
		onDone(data)
		socket.disconnect()
	})

	socket.on("error", (error) => {
		onError(error)
		console.error("WebSocket Error:", error)
	})
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

	const res: any = await fetch(`${PROJECT_MANAGEMENT_ENDPOINT}/deploy`, options)

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

	const res: any = await fetch(`${PROJECT_MANAGEMENT_ENDPOINT}/archive`, options)

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

	const res: any = await fetch(`${PROJECT_MANAGEMENT_ENDPOINT}`, options)
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

	const res: any = await fetch(`${PROJECT_MANAGEMENT_ENDPOINT}`, options)
	return await res.json()
}

export async function fetchProject(id: string) {
	const res: any = await fetch(`${PROJECT_MANAGEMENT_ENDPOINT}/fetch/${id}`)
	if (res.status == 404) throw new ProjectNotFoundError()
	return await res.json()
}

export async function fetchAllProjects(owner: string) {
	const res: any = await fetch(`${PROJECT_MANAGEMENT_ENDPOINT}/fetch-all/${owner}`)
	return await res.json()
}
