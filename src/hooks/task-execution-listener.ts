import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { io, Socket } from "socket.io-client"
import { TaskExecutionDetails } from "../types/task-execution"
import { taskExecutionTriggered, taskExecutionUpdated } from "../reducers/workspace-reducer"

type UseTaskExecutionListenerProps = {
	accountId: string | null
}

const HONEYCOMB_ENDPOINT = process.env.HONEYCOMB_ENDPOINT

export const useTaskExecutionListener = ({ accountId }: UseTaskExecutionListenerProps) => {
	const socketRef = useRef<Socket | null>(null)
	const dispatch = useDispatch()

	const onTaskExecutionCreation = (taskExecution: TaskExecutionDetails) => {
		dispatch(taskExecutionTriggered(taskExecution))
	}

	const onTaskExecutionUpdate = (taskExecution: TaskExecutionDetails) => {
		dispatch(taskExecutionUpdated(taskExecution))
	}

	useEffect(() => {
		if (!accountId) return

		const socket = io(HONEYCOMB_ENDPOINT)

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
