import React, { useEffect, useState } from "react"

import { useTaskExecutionTimeline, useSelectedProjectId } from "../hooks/store"
import { TaskExecutionDetails } from "../types/task-execution"
import TaskExecution from "./task-execution"
import { Loader } from "@jigjoy-io/ui-library"
import { fetchProjectTimeline, fetchAccountTimeline } from "../api/task-execution"
import { taskExecutionTimelineUpdated } from "../reducers/workspace-reducer"
import { useDispatch } from "react-redux"
import { getCurrentUser } from "aws-amplify/auth"
import { useTaskExecutionListener } from "../hooks/task-execution-listener"

const TaskExecutionTimeline: React.FC<{ type: "project" | "account" }> = ({ type }) => {
	const selectedProjectId = useSelectedProjectId()
	const taskExecutionTimeline = useTaskExecutionTimeline()
	const [isLoading, setIsLoading] = useState(true)
	const dispatch = useDispatch()
	const [accountId, setAccountId] = useState<string | null>(null)

	const fetchTimeline = async () => {
		if (type === "project" && selectedProjectId) {
			const timeline = await fetchProjectTimeline(selectedProjectId)
			dispatch(taskExecutionTimelineUpdated(timeline))
			setIsLoading(false)
		} else if (type === "account" && accountId) {
			const timeline = await fetchAccountTimeline(accountId)
			dispatch(taskExecutionTimelineUpdated(timeline))
			setIsLoading(false)
		}
	}

	const getAccountId = async () => {
		const user = await getCurrentUser()
		const authorId = user.signInDetails?.loginId
		if (authorId) {
			setAccountId(authorId)
		}
	}

	useEffect(() => {
		getAccountId()
		fetchTimeline()
	}, [selectedProjectId, accountId])

	//useTaskExecutionListener({ accountId: accountId })

	return (
		<div className="flex flex-col bg-surface shadow-md grow h-0 gap-4 overflow-y-auto custom-scrollbar pb-4 border border-primary-200 rounded-sm">
			<div className="px-4 pt-4 flex flex-row w-full bg-surface text-highlight-100 text-sm">Task Executions</div>

			{isLoading ? (
				<div className="flex flex-col items-center px-3 text-sm justify-center h-full">
					<Loader size="large" message="Timeline loading..." />
				</div>
			) : taskExecutionTimeline.length === 0 ? (
				<div className="flex flex-col px-4 text-sm items-center h-full">
					<div className="text-sm text-secondary-100">
						Task execution progress status will appear here once you start a run.
					</div>
				</div>
			) : (
				taskExecutionTimeline.map((runInfo: TaskExecutionDetails, index: number) => (
					<div key={index}>
						<div className="flex flex-col items-center px-3 text-sm">
							<TaskExecution runInfo={runInfo} />
						</div>
					</div>
				))
			)}
		</div>
	)
}

export default TaskExecutionTimeline
