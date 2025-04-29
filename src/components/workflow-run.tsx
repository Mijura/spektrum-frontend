import { WorkflowRunData, WorkflowStatus } from "../types/workflow-run"
import { Card, Tooltip, Chip } from "@honeycomb-app/design"
import CheckOutputIcon from "../shared/icons/check-output-icon"
import WatchIcon from "../shared/icons/watch-icon"
import { formatTimestamp } from "../shared/util"

const WorkflowRun: React.FC<{ runInfo: WorkflowRunData }> = ({ runInfo }) => {
	return (
		<Card
			className={`cursor-default p-1 rounded-md grow items-center flex flex-col w-full border-l-4 ${runInfo.metadata.status === WorkflowStatus.SUCCESSED ? "border-l-[#869B73]" : "border-l-danger"}`}
		>
			<div className="flex flex-row w-full">
				<div className="pl-1 grow w-0">
					<div className="gap-1 items-center flex flex-row">
						<p className="p-1 text-secondary-100 truncate w-full">{runInfo.metadata.title}</p>
					</div>

					<div className="py-1 flex flex-row gap-1 text-secondary-100">
						<Chip label={runInfo.metadata.workflowId} />
					</div>

					<div className="p-1 h-fit w-full text-secondary-100 flex items-end gap-2">
						{runInfo.metadata?.status === WorkflowStatus.SUCCESSED && (
							<div className="cursor-pointer grow flex gap-1" onClick={() => {}}>
								<Tooltip message="Check output">
									<CheckOutputIcon />
								</Tooltip>
							</div>
						)}
						<div className="text-secondary-100 text-xs items-center justify-end flex h-fit gap-1">
							<WatchIcon />
							{formatTimestamp(runInfo.occurredAt)}
						</div>
					</div>
				</div>
			</div>
		</Card>
	)
}

export default WorkflowRun
