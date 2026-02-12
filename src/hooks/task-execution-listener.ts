import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { io, Socket } from "socket.io-client"
import { taskExecutionTriggered, taskExecutionUpdated } from "../reducers/workspace-reducer"
import { TaskExecution } from "@jigjoy-ai/platform-sdk"

type UseTaskExecutionListenerProps = {
	accountId: string | null
}

const API_GATEWAY = process.env.API_GATEWAY as string

export const useTaskExecutionListener = ({ accountId }: UseTaskExecutionListenerProps) => {
	const socketRef = useRef<Socket | null>(null)
	const dispatch = useDispatch()

	const onTaskExecutionCreation = (taskExecution: TaskExecution) => {
		dispatch(taskExecutionTriggered(taskExecution))
	}

	const onTaskExecutionUpdate = (taskExecution: TaskExecution) => {
		dispatch(taskExecutionUpdated(taskExecution))
	}

	useEffect(() => {
		if (!accountId) return

		const socket = io(`${API_GATEWAY}`)

		socket.on("connect", () => {
			socket.emit("subscribe", accountId)
		})

		socketRef.current = socket

		socket.on("task-execution:new", onTaskExecutionCreation)
		socket.on("task-execution:update", onTaskExecutionUpdate)

		return () => {
			if (onTaskExecutionCreation) socket.off("update", onTaskExecutionCreation)
			socket.disconnect()
		}
	}, [accountId])
}
