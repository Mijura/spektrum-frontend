import { useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"

type UseActivityListenerProps = {
	projectId: string
}

// TODO: Rename endpoint name to something more descriptive
const HONEYCOMB_ENDPOINT = process.env.HONEYCOMB_ENDPOINT

export const useActivityListener = ({ projectId }: UseActivityListenerProps) => {
	const socketRef = useRef<Socket | null>(null)

	const onUpdate = (data: any) => {
		console.log("update", data)
	}

	const onDone = (data: any) => {
		console.log("done", data)
	}

	useEffect(() => {
		if (!projectId) return

		const socket = io(HONEYCOMB_ENDPOINT)

		socket.on("connect", () => {
			socket.emit("subscribe", projectId)
		})

		socketRef.current = socket

		socket.on("issue:update", onUpdate)
		socket.on("done", onDone)

		return () => {
			if (onUpdate) socket.off("update", onUpdate)
			if (onDone) socket.off("done", onDone)
			socket.disconnect()
		}
	}, [projectId])
}
