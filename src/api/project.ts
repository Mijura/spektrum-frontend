import { ProjectNotFoundError } from "../shared/errors/project-not-found-error"

export const PROJECT_MANAGEMENT_API = process.env.REACT_APP_PROJECT_MANAGEMENT_API

interface ChangeRequest {
	projectId: string
	message: string
}

import { io } from "socket.io-client"

export const develop = (
	changeRequest: any,
	onUpdate: (data: any) => void,
	onDone: (data: any) => void,
	onError: (error: any) => void,
) => {
	const socket = io("http://localhost:3000")

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

	// // Return a function to close the connection when needed
	// return () => {
	// 	console.log("Closing WebSocket connection...")
	// 	socket.disconnect()
	// }
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
