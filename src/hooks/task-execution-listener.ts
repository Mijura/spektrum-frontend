import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { io, Socket } from "socket.io-client"
import { WorkflowRunDetails } from "../types/workflow-run"
import { workflowRunTriggered, workflowRunUpdated } from "../reducers/workspace-reducer"

type UseTaskExecutionListenerProps = {
	accountId: string | null
}

const HONEYCOMB_ENDPOINT = process.env.HONEYCOMB_ENDPOINT

export const useTaskExecutionListener = ({ accountId }: UseTaskExecutionListenerProps) => {
	const socketRef = useRef<Socket | null>(null)
	const dispatch = useDispatch()

	const onWorkflowRunCreation = (workflowRun: WorkflowRunDetails) => {
		dispatch(workflowRunTriggered(workflowRun))
	}

	const onWorkflowRunUpdate = (workflowRun: WorkflowRunDetails) => {
		dispatch(workflowRunUpdated(workflowRun))
	}

	useEffect(() => {
		if (!accountId) return

		const socket = io(HONEYCOMB_ENDPOINT)

		socket.on("connect", () => {
			socket.emit("subscribe", accountId)
		})

		socketRef.current = socket

		socket.on("task-execution:new", onWorkflowRunCreation)
		socket.on("task-execution:update", onWorkflowRunUpdate)

		return () => {
			if (onWorkflowRunCreation) socket.off("update", onWorkflowRunCreation)
			socket.disconnect()
		}
	}, [accountId])
}
