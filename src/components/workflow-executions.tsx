import React, { useEffect } from "react"
import TimelineIcon from "../shared/icons/timeline-icon"
import { useTimeline } from "@honeycomb-app/jigjoy-react-sdk"
import { Card, Tooltip } from "@honeycomb-app/design"
import CheckboxIcon from "../shared/icons/checkbox-icon"
import CheckmarkIcon from "../shared/icons/checkmark-icon"
import FailedIcon from "../shared/icons/failed-icon"
import SuccessIcon from "../shared/icons/success-icon"
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
		<div className="flex flex-col bg-surface mt-3 shadow-md h-full gap-4">
			<div className="px-4 pt-4 flex flex-row w-full bg-surface text-highlight text-sm">Workflow Executions</div>

			{timelineData &&
				timelineData.map((execution: any) => (
					<>
						<div className="flex flex-col items-center px-3 text-sm">
							<Card
								className={`mx-4 p-1 rounded-md grow items-center flex flex-col w-full ${execution.data.buildStatus === "success" ? "border-l-progress" : "border-l-danger"} border-l-4`}
							>
								<div className="flex flex-row w-full">
									<div className="h-full flex items-center justify-center px-2">
										{execution.data.buildStatus === "success" ? (
											<SuccessIcon />
										) : (
											<Tooltip message="Failed" className="cursor-pointer">
												<FailedIcon />
											</Tooltip>
										)}
									</div>

									<div className="pl-2 grow">
										<div className="p-1 h-fit w-full text-secondary-100">{execution.data.workflowId}</div>

										<div className="p-1 mt-2 h-fit w-full text-secondary-100 flex items-end gap-2">
											<div className="text-secondary-100 text-sm flex h-fit gap-1">
												<WatchIcon />
												{formatTimestamp(execution.timestamp)}
											</div>
											<div className="cursor-pointer grow flex justify-end" onClick={() => {}}>
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
				))}
		</div>
	)
}

export default WorkflowExecutionsTimeline
