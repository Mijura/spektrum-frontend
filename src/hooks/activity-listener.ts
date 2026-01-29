import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { io, Socket } from "socket.io-client"
import { taskUpdated } from "../reducers/workspace-reducer"
import { Task } from "@jigjoy-io/task-contracts"

type UseActivityListenerProps = {
	room: string
}

const API_GATEWAY = process.env.API_GATEWAY as string

export const useActivityListener = ({ room }: UseActivityListenerProps) => {
	const socketRef = useRef<Socket | null>(null)
	const dispatch = useDispatch()

	const onUpdate = (task: Task) => {
		dispatch(taskUpdated(task))
	}

	useEffect(() => {
		if (!room) return

		const socket = io(`${API_GATEWAY}`)

		socket.on("connect", () => {
			socket.emit("subscribe", room)
		})

		socketRef.current = socket

		socket.on("task:update", onUpdate)

		return () => {
			if (onUpdate) socket.off("update", onUpdate)
			socket.disconnect()
		}
	}, [room])
}
