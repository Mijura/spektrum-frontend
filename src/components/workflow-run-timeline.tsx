import React, { useEffect, useState } from "react"

import { useWorkflowRunTimeline, useSelectedProjectId } from "../hooks/store"
import { WorkflowRunDetails } from "../types/workflow-run"
import WorkflowRun from "./workflow-run"
import { Loader } from "@honeycomb-app/design"
import { fetchProjectTimeline, fetchAccountTimeline } from "../api/workflow-run"
import { workflowRunTimelineUpdated } from "../reducers/workspace-reducer"
import { useDispatch } from "react-redux"
import { getCurrentUser } from "aws-amplify/auth"
import { useWorkflowRunListener } from "../hooks/workflow-run-listener"

const WorkflowRunTimeline: React.FC<{ type: "project" | "account" }> = ({ type }) => {
	const selectedProjectId = useSelectedProjectId()
	const workflowRunTimeline = useWorkflowRunTimeline()
	const [isLoading, setIsLoading] = useState(true)
	const dispatch = useDispatch()
	const [accountId, setAccountId] = useState<string | null>(null)

	const fetchTimeline = async () => {
		if (type === "project" && selectedProjectId) {
			const timeline = await fetchProjectTimeline(selectedProjectId)
			dispatch(workflowRunTimelineUpdated(timeline))
			setIsLoading(false)
		} else if (type === "account" && accountId) {
			const timeline = await fetchAccountTimeline(accountId)
			dispatch(workflowRunTimelineUpdated(timeline))
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

	useWorkflowRunListener({ accountId: accountId })

	return (
		<div className="flex flex-col bg-surface shadow-md grow h-0 gap-4 overflow-y-auto custom-scrollbar pb-4 border border-primary-200 rounded-sm">
			<div className="px-4 pt-4 flex flex-row w-full bg-surface text-highlight-100 text-sm">Workflow Run Timeline</div>

			{isLoading ? (
				<div className="flex flex-col items-center px-3 text-sm justify-center h-full">
					<Loader size="small" message="Timeline loading..." />
				</div>
			) : workflowRunTimeline.length === 0 ? (
				<div className="flex flex-col px-4 text-sm items-center h-full">
					<div className="text-sm text-secondary-100">Workflow progress status will appear here once you start a run.</div>
				</div>
			) : (
				workflowRunTimeline.map((runInfo: WorkflowRunDetails, index: number) => (
					<div key={index}>
						<div className="flex flex-col items-center px-3 text-sm">
							<WorkflowRun runInfo={runInfo} />
						</div>
					</div>
				))
			)}
		</div>
	)
}

export default WorkflowRunTimeline
