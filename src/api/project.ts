import { ProjectNotFoundError } from "../shared/errors/project-not-found-error"

export const PROJECT_MANAGEMENT_ENDPOINT = process.env.PROJECT_MANAGEMENT_ENDPOINT

interface ChangeRequest {
	projectId: string
	message: string
}

import { io } from "socket.io-client"

export const develop = (
	changeRequest: ChangeRequest,
	onUpdate: (data: any) => void,
	onDone: (data: any) => void,
	onError: (error: any) => void,
) => {
	const socket = io("http://localhost:3000") //TODO: fix this!

	socket.on("connect", () => {
		console.log("Connected to WebSocket")
		socket.emit("develop", {
			projectId: changeRequest.projectId,
			message: changeRequest.message,
		})
	})

	socket.on("update", (data) => {
		console.log("Received update:", data)
		onUpdate(data)
	})

	socket.on("done", (data) => {
		console.log("Development complete!", data)
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

export async function fetchProject(id: string) {
	const res: any = await fetch(`${PROJECT_MANAGEMENT_ENDPOINT}/fetch/${id}`)
	if (res.status == 404) throw new ProjectNotFoundError()
	return await res.json()
}

export async function fetchAllProjects(owner: string) {
	const res: any = await fetch(`${PROJECT_MANAGEMENT_ENDPOINT}/fetch-all/${owner}`)
	return await res.json()
}
