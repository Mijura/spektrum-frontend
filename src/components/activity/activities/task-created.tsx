import { motion } from "framer-motion"
import { formatTimestamp } from "../../../shared/util"
import { TaskCreatedActivity, TaskCreatedMetadata } from "@jigjoy-ai/task-contracts"
import CreateIcon from "../../../shared/icons/create-icon"

export const TaskCreatedActivityComponent = ({ activity }: { activity: TaskCreatedActivity }) => (
	<div className="flex w-full items-center 2xl:gap-y-4 gap-x-1 h-fit">
		<div className="w-fit h-fit">
			<CreateIcon />
		</div>
		<motion.div className="flex flex-col gap-x-3 text-sm rounded-sm" transition={{ duration: 0.2 }}>
			<div className="flex flex-row gap-x-1 items-center">
				<span className="text-xs italic">
					<span className="text-secondary mr-2">{formatTimestamp(activity.occurredAt)}</span>
					{(activity.metadata as TaskCreatedMetadata).message}
				</span>
			</div>
			<div className="text-xs italic"></div>
		</motion.div>
	</div>
)
