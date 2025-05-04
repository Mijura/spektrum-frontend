import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { io, Socket } from "socket.io-client"
import { issueUpdated } from "../reducers/workspace-reducer"
import { Issue } from "../types/issue"

type UseActivityListenerProps = {
	projectId: string
}

// TODO: Rename endpoint name to something more descriptive
const HONEYCOMB_ENDPOINT = process.env.HONEYCOMB_ENDPOINT

export const useActivityListener = ({ projectId }: UseActivityListenerProps) => {
	const socketRef = useRef<Socket | null>(null)
	const dispatch = useDispatch()

	const onUpdate = (issue: Issue) => {
		console.log("update", issue)
		dispatch(issueUpdated(issue))
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
