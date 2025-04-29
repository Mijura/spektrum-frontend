import React from "react"

import { useSelectedProject } from "../hooks/store"
import { WorkflowRunData, WorkflowStatus } from "../types/workflow-run"
import WorkflowRun from "./workflow-run"
import { Loader } from "@honeycomb-app/design"
const WorkflowRunTimeline: React.FC = () => {
	const selectedProject = useSelectedProject()
	const workflowRuns = selectedProject.workflowRuns
	return (
		<div className="flex flex-col bg-surface shadow-md grow h-0 gap-4 overflow-y-auto custom-scrollbar pb-4 border border-primary-200 rounded-sm">
			<div className="px-4 pt-4 flex flex-row w-full bg-surface text-secondary-100 text-sm">Workflow Run Timeline</div>

			{selectedProject ? (
				workflowRuns.map((runInfo: WorkflowRunData, index: number) => (
					<div key={index}>
						<div className="flex flex-col items-center px-3 text-sm">
							<WorkflowRun runInfo={runInfo} />
						</div>
					</div>
				))
			) : (
				<div className="flex flex-col items-center px-3 text-sm justify-center h-full">
					<Loader size="small" message="Loading executions" />
				</div>
			)}
		</div>
	)
}

export default WorkflowRunTimeline
