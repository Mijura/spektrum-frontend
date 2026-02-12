import { motion } from "framer-motion"
import { formatTimestamp } from "../../../shared/util"
import { FinishedWorkActivity, FinishedWorkMetadata } from "@jigjoy-ai/task-contracts"
import EditIcon from "../../../shared/icons/edit-icon"

export const FinishedWorkActivityComponent = ({ activity }: { activity: FinishedWorkActivity }) => (
	<div className="flex w-full items-center 2xl:gap-y-4 gap-x-1 h-fit">
		<div className="w-fit h-fit">
			<EditIcon />
		</div>
		<motion.div className="flex flex-col gap-x-3 text-sm rounded-sm" transition={{ duration: 0.2 }}>
			<div className="flex flex-row gap-x-1 items-center">
				<span className="text-xs italic">
					<span className="text-secondary mr-2">{formatTimestamp(activity.occurredAt)}</span>
					{(activity.metadata as FinishedWorkMetadata).message}
				</span>
			</div>
			<div className="text-xs italic"></div>
		</motion.div>
	</div>
)
