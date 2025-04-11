import React, { useEffect } from "react"
import { useTimeline } from "@honeycomb-app/jigjoy-react-sdk"
import { Card, Loader, Tooltip, Chip } from "@honeycomb-app/design"
import CheckOutputIcon from "../shared/icons/check-output-icon"
import WatchIcon from "../shared/icons/watch-icon"

const WorkflowExecutionsTimeline: React.FC = () => {
	const { timelineData } = useTimeline({ gameId: "honeycomb" })

	useEffect(() => {
		console.log(`timelineData`, timelineData)
	}, [timelineData])

	function formatTimestamp(timestamp: string, options = { timeZone: undefined }) {
		const date = new Date(timestamp)

		return date.toLocaleString("en-US", {
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
			timeZone: options.timeZone, // Pass 'UTC' if you want UTC time
		})
	}

	return (
		<div className="flex flex-col bg-surface mt-3 shadow-md grow h-0 gap-4 overflow-y-auto custom-scrollbar pb-4">
			<div className="px-4 pt-4 flex flex-row w-full bg-surface text-highlight text-sm">Workflow Executions</div>

			{timelineData ? (
				timelineData.map((execution: any) => (
					<>
						<div className="flex flex-col items-center px-3 text-sm">
							<Card
								className={`p-1 rounded-md grow items-center flex flex-col w-full ${execution.data.buildStatus === "success" ? "border-l-progress" : "border-l-danger"} border-l-4`}
							>
								<div className="flex flex-row w-full">
									<div className="pl-2 grow w-0">
										<div className="gap-1 items-center">
											<p className="px-2 py-1 text-secondary-100 truncate w-full">{execution.data.ticketTitle}</p>
										</div>

										<Chip label={execution.data.workflowId} />

										<div className="p-1 h-fit w-full text-secondary-100 flex items-end gap-2">
											<div className="text-secondary-100 text-xs items-center flex h-fit gap-1">
												<WatchIcon />
												{formatTimestamp(execution.timestamp)}
											</div>
											<div className="cursor-pointer grow flex justify-end gap-1" onClick={() => {}}>
												<Tooltip message="Check Output">
													<CheckOutputIcon />
												</Tooltip>
											</div>
										</div>
									</div>
								</div>
							</Card>
						</div>
					</>
				))
			) : (
				<div className="flex flex-col items-center px-3 text-sm justify-center h-full">
					<Loader size="small" message="Loading executions" />
				</div>
			)}
		</div>
	)
}

export default WorkflowExecutionsTimeline
