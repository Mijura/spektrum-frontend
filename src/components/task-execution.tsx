import { TaskExecutionDetails, TaskExecutionStatus } from "../types/task-execution"
import { Card, Chip } from "@honeycomb-app/design"
import WatchIcon from "../shared/icons/watch-icon"
import { formatTimestamp } from "../shared/util"
import { useEffect, useState } from "react"

const TaskExecution: React.FC<{ runInfo: TaskExecutionDetails }> = ({ runInfo }) => {
	const [borderStyle, setBorderStyle] = useState("border-l-highlight")
	const [taskExecutionDetails, setTaskExecutionDetails] = useState<TaskExecutionDetails | null>(null)

	const getBorder = (status: TaskExecutionStatus) => {
		switch (status) {
			case TaskExecutionStatus.SUCCEEDED:
				return "border-l-[#869B73]"
			case TaskExecutionStatus.FAILED:
				return "border-l-danger"
			case TaskExecutionStatus.RUNNING:
				return "animate-borderPulse"
			default:
				return "border-l-secondary"
		}
	}

	useEffect(() => {
		if (runInfo) {
			const border = getBorder(runInfo.status)
			setBorderStyle(border)
			setTaskExecutionDetails(runInfo)
		}
	}, [runInfo])

	return (
		taskExecutionDetails && (
			<Card className={`cursor-default p-1 rounded-md grow items-center flex flex-col w-full border-l-4 ${borderStyle}`}>
				<div className="flex flex-row w-full">
					<div className="pl-1 grow w-0">
						<div className="gap-1 items-center flex flex-row">
							<p className="p-1 text-secondary-100 truncate w-full">{taskExecutionDetails.title}</p>
						</div>

						<div className="py-1 flex flex-row gap-1 text-secondary-100">
							<Chip label="Frontend Development" />
						</div>

						<div className="p-1 h-fit w-full text-secondary-100 flex items-end gap-2">
							<div className="grow text-secondary-100 text-xs items-center justify-end flex h-fit gap-1">
								<WatchIcon />
								{formatTimestamp(taskExecutionDetails.occurredAt)}
							</div>
						</div>
					</div>
				</div>
			</Card>
		)
	)
}

export default TaskExecution
