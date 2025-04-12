import { Tabs, Tab } from "@honeycomb-app/design"
import ActivityRewards from "../components/activity-rewards"
import { useProject } from "../hooks/use-project"
import TicketPlanning from "../components/ticket-planning"
import AppPreview from "../components/app-preview"
import Deployment from "../components/deployment"
import WorkflowExecutionsTimeline from "../components/workflow-executions"

export default function WorkspacePage() {
	const project = useProject()

	return (
		project && (
			<div key={project.id} className="w-full flex flex-row pl-4">
				<div className="h-full w-fit bg-surface overflow-y-auto custom-scrollbar border border-primary-200 rounded-sm">
					<TicketPlanning tickets={project.tickets} />
				</div>

				<div className="grow bg-[#1a1a1a]"></div>

				<div className="w-[325px] flex flex-col rounded-[2px]">
					<ActivityRewards />
					<WorkflowExecutionsTimeline />
				</div>
			</div>
		)
	)
}
