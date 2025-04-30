import { useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"
import { Issue } from "../types/issue"

type UseActivityListenerProps = {
	issue: Issue
}

// TODO: Rename endpoint name to something more descriptive
const PROJECT_MANAGEMENT_ENDPOINT = process.env.PROJECT_MANAGEMENT_ENDPOINT

export const useActivityListener = ({ issue }: UseActivityListenerProps) => {
	const socketRef = useRef<Socket | null>(null)

	const onUpdate = (data: any) => {
		console.log("update", data)
	}

	const onDone = (data: any) => {
		console.log("done", data)
	}

	useEffect(() => {
		if (!issue) return

		const socket = io(PROJECT_MANAGEMENT_ENDPOINT)

		socket.on("connect", () => {
			socket.emit("subscribe", issue.id)
		})

		socketRef.current = socket

		socket.on("update", onUpdate)
		socket.on("done", onDone)

		return () => {
			if (onUpdate) socket.off("update", onUpdate)
			if (onDone) socket.off("done", onDone)
			socket.disconnect()
		}
	}, [issue])
}
