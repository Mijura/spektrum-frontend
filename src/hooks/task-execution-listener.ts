import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { io, Socket } from "socket.io-client"
import { taskExecutionTriggered, taskExecutionUpdated } from "../reducers/workspace-reducer"
import { creditsSpent } from "../reducers/account-reducer"
import { TaskExecution } from "@jigjoy-ai/spektrum-client"
import { authStoreBrowser } from "@jigjoy-ai/http-client"

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

	const onTaskExecutionCreditsSpent = (amount: number) => {
		dispatch(creditsSpent(Number(amount)))
	}

	useEffect(() => {
		if (!accountId) return

		const credentials = authStoreBrowser.getCredentials()
		if (credentials.kind === "bearer") {
			const socket = io(`${API_GATEWAY}`, {
				extraHeaders: {
					Authorization: `Bearer ${credentials.token}`,
				},
			})

			console.log("Connecting for listening activities for accountId: ", accountId)

			socket.on("connect", () => {
				socket.emit("subscribe", accountId)
			})

			socketRef.current = socket

			socket.on("task-execution:new", onTaskExecutionCreation)
			socket.on("task-execution:update", onTaskExecutionUpdate)
			socket.on("task-execution:credits-spent", onTaskExecutionCreditsSpent)

			return () => {
				if (onTaskExecutionCreation) socket.off("update", onTaskExecutionCreation)
				socket.disconnect()
			}
		}
	}, [accountId])
}
