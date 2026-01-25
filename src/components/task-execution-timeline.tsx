import React, { useEffect, useState } from "react"
import { useTaskExecutionTimeline, useSelectedProjectId, useUserData } from "../hooks/store"
import TaskExecutionComponent from "./task-execution"
import { Loader } from "@jigjoy-io/ui-library"
import { fetchProjectTimeline, fetchAccountTimeline } from "../api/observability"
import { taskExecutionTimelineUpdated } from "../reducers/workspace-reducer"
import { useDispatch } from "react-redux"
import { useTaskExecutionListener } from "../hooks/task-execution-listener"
import { TaskExecution } from "@jigjoy-io/observability-client"

const TaskExecutionTimeline: React.FC<{ type: "project" | "account" }> = ({ type }) => {
	const selectedProjectId = useSelectedProjectId()
	const taskExecutionTimeline = useTaskExecutionTimeline()
	const [isLoading, setIsLoading] = useState(true)
	const dispatch = useDispatch()
	const userData = useUserData()

	const fetchTimeline = async () => {
		if (type === "project" && selectedProjectId) {
			const timeline = await fetchProjectTimeline(selectedProjectId)
			dispatch(taskExecutionTimelineUpdated(timeline))
			setIsLoading(false)
		} else if (type === "account" && userData.userId) {
			const timeline = await fetchAccountTimeline(userData.userId)
			dispatch(taskExecutionTimelineUpdated(timeline))
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchTimeline()
	}, [selectedProjectId, userData.userId])

	useTaskExecutionListener({ accountId: userData.userId })

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
				taskExecutionTimeline.map((runInfo: TaskExecution, index: number) => (
					<div key={index}>
						<div className="flex flex-col items-center px-3 text-sm">
							<TaskExecutionComponent runInfo={runInfo} />
						</div>
					</div>
				))
			)}
		</div>
	)
}

export default TaskExecutionTimeline
