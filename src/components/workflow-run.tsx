import { WorkflowRunDetails, WorkflowStatus } from "../types/workflow-run"
import { Card, Tooltip, Chip } from "@honeycomb-app/design"
import CheckOutputIcon from "../shared/icons/check-output-icon"
import WatchIcon from "../shared/icons/watch-icon"
import { formatTimestamp } from "../shared/util"
import { useEffect, useState } from "react"

const WorkflowRun: React.FC<{ runInfo: WorkflowRunDetails }> = ({ runInfo }) => {
	const [borderStyle, setBorderStyle] = useState("border-l-highlight")
	const [workflowRunDetails, setWorkflowRunDetails] = useState<WorkflowRunDetails | null>(null)

	const getBorder = (status: WorkflowStatus) => {
		switch (status) {
			case WorkflowStatus.SUCCEEDED:
				return "border-l-[#869B73]"
			case WorkflowStatus.FAILED:
				return "border-l-danger"
			case WorkflowStatus.RUNNING:
				return "animate-borderPulse"
			default:
				return "border-l-secondary"
		}
	}

	useEffect(() => {
		if (runInfo) {
			const border = getBorder(runInfo.status)
			setBorderStyle(border)
			setWorkflowRunDetails(runInfo)
		}
	}, [runInfo])

	return (
		workflowRunDetails && (
			<Card className={`cursor-default p-1 rounded-md grow items-center flex flex-col w-full border-l-4 ${borderStyle}`}>
				<div className="flex flex-row w-full">
					<div className="pl-1 grow w-0">
						<div className="gap-1 items-center flex flex-row">
							<p className="p-1 text-secondary-100 truncate w-full">{workflowRunDetails.title}</p>
						</div>

						<div className="py-1 flex flex-row gap-1 text-secondary-100">
							<Chip label={workflowRunDetails.workflowId} />
						</div>

						<div className="p-1 h-fit w-full text-secondary-100 flex items-end gap-2">
							{/* {workflowRunDetails.status === WorkflowStatus.SUCCEEDED && (
								<div className="cursor-pointer w-fit flex gap-1" onClick={() => {}}>
									<Tooltip message="Check output">
										<CheckOutputIcon />
									</Tooltip>
								</div>
							)} */}
							<div className="grow text-secondary-100 text-xs items-center justify-end flex h-fit gap-1">
								<WatchIcon />
								{formatTimestamp(workflowRunDetails.occurredAt)}
							</div>
						</div>
					</div>
				</div>
			</Card>
		)
	)
}

export default WorkflowRun
