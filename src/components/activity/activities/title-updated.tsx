import { motion } from "framer-motion"
import { formatTimestamp } from "../../../shared/util"
import { ActivityData, TitleUpdatedMetadata } from "../../../types/activity"
import EditIcon from "../../../shared/icons/edit-icon"

export const TitleUpdatedActivity = ({ activity }: { activity: ActivityData }) => (
	<div className="flex w-full items-center 2xl:gap-y-4 h-fit">
		<div className="w-fit h-fit mx-1">
			<EditIcon />
		</div>
		<motion.div className="flex flex-col gap-x-3 text-sm p-2 rounded-sm" transition={{ duration: 0.2 }}>
			<div className="flex flex-row gap-x-1 items-center">
				<span className="text-xs italic">
					<span className="text-secondary mr-2">{formatTimestamp(activity.occurredAt)}</span>
					{(activity.metadata as TitleUpdatedMetadata).message}
				</span>
			</div>
		</motion.div>
	</div>
)
