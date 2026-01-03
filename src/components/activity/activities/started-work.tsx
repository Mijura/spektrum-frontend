import { motion } from "framer-motion"
import { formatTimestamp } from "../../../shared/util"
import { StartedWorkActivity, StartedWorkMetadata } from "@jigjoy-io/task-contracts"
import { WorkerLoader } from "../../../shared/icons/worker-loader"
import { AnimatedText } from "@jigjoy-io/ui-library"

export const StartedWorkActivityComponent = ({ activity }: { activity: StartedWorkActivity }) => (
	<div className="flex w-full items-center 2xl:gap-y-4 gap-x-1 h-fit">
		<div className="w-fit h-fit">
			<WorkerLoader />
		</div>
		<motion.div className="flex flex-col w-full gap-x-3 text-sm rounded-sm" transition={{ duration: 0.2 }}>
			<div className="flex flex-row gap-x-1 text-xs italic w-full">
				<div className="text-secondary w-fit items-center flex mr-2">{formatTimestamp(activity.occurredAt)}</div>
				<div className="grow">
					<AnimatedText text={(activity.metadata as StartedWorkMetadata).message} className="justify-start p-0" />
				</div>
			</div>
		</motion.div>
	</div>
)
