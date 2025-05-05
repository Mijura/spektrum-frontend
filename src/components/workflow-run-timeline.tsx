import React, { useEffect, useState } from "react"

import { useWorkflowRunTimeline, useSelectedProject } from "../hooks/store"
import { WorkflowRunDetails } from "../types/workflow-run"
import WorkflowRun from "./workflow-run"
import { Loader } from "@honeycomb-app/design"
import { fetchWorkflowRunTimeline } from "../api/workflow-run"
import { workflowRunTimelineUpdated } from "../reducers/workspace-reducer"
import { useDispatch } from "react-redux"
const WorkflowRunTimeline: React.FC = () => {
	const selectedProject = useSelectedProject()
	const workflowRunTimeline = useWorkflowRunTimeline()
	const [isLoading, setIsLoading] = useState(true)
	const dispatch = useDispatch()

	const fetchTimeline = async () => {
		if (selectedProject) {
			const timeline = await fetchWorkflowRunTimeline(selectedProject.id)
			dispatch(workflowRunTimelineUpdated(timeline))
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchTimeline()
	}, [selectedProject])

	return (
		<div className="flex flex-col bg-surface shadow-md grow h-0 gap-4 overflow-y-auto custom-scrollbar pb-4 border border-primary-200 rounded-sm">
			<div className="px-4 pt-4 flex flex-row w-full bg-surface text-secondary-100 text-sm">Workflow Run Timeline</div>

			{isLoading ? (
				<div className="flex flex-col items-center px-3 text-sm justify-center h-full">
					<Loader size="small" message="Timeline loading..." />
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
