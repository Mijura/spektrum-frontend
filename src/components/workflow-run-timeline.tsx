import React from "react"
import { useTimeline } from "@honeycomb-app/jigjoy-react-sdk"
import { Card, Loader, Tooltip, Chip } from "@honeycomb-app/design"
import CheckOutputIcon from "../shared/icons/check-output-icon"
import WatchIcon from "../shared/icons/watch-icon"
import { formatTimestamp } from "../shared/util"

const WorkflowRunTimeline: React.FC = () => {
	const { timelineData } = useTimeline({ gameId: "honeycomb" })

	return (
		<div className="flex flex-col bg-surface shadow-md grow h-0 gap-4 overflow-y-auto custom-scrollbar pb-4 border border-primary-200 rounded-sm">
			<div className="px-4 pt-4 flex flex-row w-full bg-surface text-secondary-100 text-sm">Workflow Run Timeline</div>

			{timelineData ? (
				timelineData.map((execution: any, index: number) => (
					<div key={index}>
						<div className="flex flex-col items-center px-3 text-sm">
							<Card
								className={`cursor-default p-1 rounded-md grow items-center flex flex-col w-full border-l-4 ${execution.data.buildStatus === "success" ? "border-l-[#869B73]" : "border-l-danger"}`}
							>
								<div className="flex flex-row w-full">
									<div className="pl-1 grow w-0">
										<div className="gap-1 items-center flex flex-row">
											<p className="p-1 text-secondary-100 truncate w-full">{execution.data.issueTitle}</p>
										</div>

										<div className="py-1 flex flex-row gap-1 text-secondary-100">
											<Chip label={execution.data.workflowId} />
										</div>

										<div className="p-1 h-fit w-full text-secondary-100 flex items-end gap-2">
											{execution.status === "success" && (
												<div className="cursor-pointer grow flex gap-1" onClick={() => {}}>
													<Tooltip message="Check output">
														<CheckOutputIcon />
													</Tooltip>
												</div>
											)}
											<div className="text-secondary-100 text-xs items-center justify-end flex h-fit gap-1">
												<WatchIcon />
												{formatTimestamp(execution.timestamp)}
											</div>
										</div>
									</div>
								</div>
							</Card>
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
