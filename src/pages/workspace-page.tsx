import { Tabs, Tab, Button } from "@honeycomb-app/design"
import ActivityRewards from "../components/activity-rewards"
import { useProject } from "../hooks/use-project"
import TicketPlanning from "../components/ticket-planning"
import AppPreview from "../components/app-preview"
import Deployment from "../components/deployment"
import WorkflowExecutionsTimeline from "../components/workflow-executions"
import TicketOverview from "../components/ticket-overview"
import { useState } from "react"

type TabType = "overview" | "output" | "deployment"

export default function WorkspacePage() {
	const project = useProject()
	const [activeTab, setActiveTab] = useState<TabType>("overview")

	const getButtonClassName = (tab: TabType) => {
		return `rounded-md h-fit p-1 px-2 ${
			activeTab === tab
				? "bg-highlight hover:bg-highlight text-primary-100 cursor-default"
				: "bg-primary text-secondary-100 hover:bg-primary-100/80"
		}`
	}

	return (
		project && (
			<div key={project.id} className="w-full flex flex-row pl-4">
				<div className="h-full w-fit bg-surface overflow-y-auto custom-scrollbar border border-primary-200 rounded-sm">
					<TicketPlanning tickets={project.tickets} />
				</div>

				<div className="grow bg-[#1a1a1a]">
					<div className="border-b border-t border-secondary-200">
						<div className="px-4 min-h-[50px] h-[50px] items-center text-secondary-100 gap-1 flex flex-row">
							<Button className={getButtonClassName("overview")} onClick={() => setActiveTab("overview")}>
								Ticket Overview
							</Button>
							<Button className={getButtonClassName("output")} onClick={() => setActiveTab("output")}>
								Output
							</Button>
							<Button className={getButtonClassName("deployment")} onClick={() => setActiveTab("deployment")}>
								Deployment
							</Button>
						</div>
					</div>

					<div className="w-full h-full">
						{activeTab === "overview" && <TicketOverview />}
						{activeTab === "output" && <AppPreview />}
						{activeTab === "deployment" && <Deployment />}
					</div>
				</div>

				<div className="w-[325px] flex flex-col rounded-[2px]">
					<ActivityRewards />
					<WorkflowExecutionsTimeline />
				</div>
			</div>
		)
	)
}
