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
			<div key={project.id} className="grow flex flex-row p-2 pl-4 gap-3">
				<Tabs>
					<Tab key="Planning" className="h-full overflow-y-auto custom-scrollbar">
						<TicketPlanning tickets={project.tickets} />
					</Tab>
					<Tab key="Output" className="flex flex-col h-full">
						<AppPreview />
					</Tab>
					<Tab key="Production">
						<Deployment />
					</Tab>
				</Tabs>
				<div className="w-[325px] flex flex-col rounded-[2px] mt-9">
					<ActivityRewards />
					<WorkflowExecutionsTimeline />
				</div>
			</div>
		)
	)
}
