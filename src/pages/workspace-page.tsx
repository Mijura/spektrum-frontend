import ActivityRewards from "../components/activity-rewards"
import TicketPlanning from "../components/ticket-planning"
import AppPreview from "../components/app-preview"
import Deployment from "../components/deployment"
import WorkflowActivityLog from "../components/workflow-activity-log"
import TicketOverview from "../components/ticket-overview"
import { useState } from "react"
import { useSelectedProject } from "../hooks/store"

type TabType = "overview" | "output" | "deployment"

export default function WorkspacePage() {
	const selectedProject = useSelectedProject()
	const [activeTab, setActiveTab] = useState<TabType>("overview")

	const getButtonClassName = (tab: TabType) => {
		return `rounded-md h-fit p-1 px-2 ${
			activeTab === tab
				? "bg-highlight items-center hover:bg-highlight text-primary-100 cursor-default p-1 text-sm flex flex-row gap-1"
				: "bg-surface-light items-center text-secondary-100 hover:bg-surface-light/80 p-1 gap-1 text-sm cursor-default flex flex-row"
		}`
	}

	return (
		selectedProject && (
			<div key={selectedProject.id} className="w-full flex flex-col pl-4 bg-[#1a1a1a]">
				<div className="h-fit bg-surface w-full flex items-center justify-center border-b border-secondary-200">
					<div className="w-fit">
						<div className="px-4 w-fit min-h-[50px] h-[50px] justify-center items-center text-secondary-100 gap-3 flex flex-row">
							<div className={getButtonClassName("overview")} onClick={() => setActiveTab("overview")}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"
									/>
								</svg>
								Planning
							</div>
							<div className={getButtonClassName("output")} onClick={() => setActiveTab("output")}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z"
									/>
								</svg>
								Output
							</div>
							<div className={getButtonClassName("deployment")} onClick={() => setActiveTab("deployment")}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
									/>
								</svg>
								Deployment
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-row h-full">
					<div className="w-full h-full">
						{activeTab === "overview" && (
							<div className="flex flex-row overflow-y-auto custom-scrollbar">
								<div className="h-full w-fit bg-surface overflow-y-auto custom-scrollbar border border-primary-200 rounded-sm">
									<TicketPlanning />
								</div>
								<TicketOverview />
							</div>
						)}
						{activeTab === "output" && <AppPreview />}
						{activeTab === "deployment" && <Deployment />}
					</div>

					<div className="w-[325px] flex flex-col rounded-[2px]">
						<ActivityRewards />
						<WorkflowActivityLog />
					</div>
				</div>
			</div>
		)
	)
}
