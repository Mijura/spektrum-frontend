import { motion } from "framer-motion"
import { formatTimestamp } from "../../../shared/util"
import { Chip } from "@honeycomb-app/design"
import { ActivityData, CommentLeftMetadata } from "../../../types/activity"

export const CommentLeftActivity = ({ activity }: { activity: ActivityData }) => (
	<div className="w-full flex">
		<div className="w-full flex flex-row items-center text-sm">
			<motion.div className="italic bg-surface-light rounded-sm p-1 2xl:p-2 w-full" transition={{ duration: 0.2 }}>
				<div className="flex flex-row gap-x-2 items-center">
					<Chip label={activity.userId} className="bg-surface text-highlight-200" />
					<span className="text-xs italic">{formatTimestamp(activity.occurredAt)}</span>
				</div>
				<div className="p-1 2xl:p-2 whitespace-pre-wrap">{(activity.metadata as CommentLeftMetadata).commentText}</div>
			</motion.div>
		</div>
	</div>
)
