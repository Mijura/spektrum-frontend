import { Tooltip } from "@honeycomb-app/design"
import React from "react"
import MoreOptionsIcon from "../shared/icons/more-options-icon"
import PlayIcon from "../shared/icons/play-icon"
import PlusIcon from "../shared/icons/plus-icon"

const TicketPlanning: React.FC = () => {
	return (
		<div className="ml-4 mt-8 px-4 w-[300px]">
			<div className="flex flex-row w-full h-fit mb-2">
				<h1 className="ml-2 text-base text-sm w-fit flex items-center">Tickets</h1>

				<div className="flex justify-end grow">
					<Tooltip message="Create new ticket">
						<PlusIcon />
					</Tooltip>
				</div>
			</div>
			<div className="border-b border-disabled w-full"></div>
			<div className="w-full bg-surface-200 p-4 rounded-lg border border-disabled my-4 cursor-pointer hover:opacity-90">
				<div className="flex flex-row text-clickable">Implement a login page</div>
				<div className="mt-2 flex flex-row gap-2 w-full">
					<Tooltip message="Change status">
						<MoreOptionsIcon />
					</Tooltip>

					<div className="flex grow w-full justify-end">
						<Tooltip message="Run execution">
							<PlayIcon />
						</Tooltip>
					</div>
				</div>
			</div>
			<div className="w-full bg-surface-200 p-4 rounded-lg border border-disabled my-4 cursor-pointer hover:opacity-90">
				<div className="flex flex-row text-clickable">Implement a register page</div>
				<div className="mt-2 flex flex-row gap-2 w-full">
					<Tooltip message="Change status">
						<MoreOptionsIcon />
					</Tooltip>

					<div className="flex grow w-full justify-end">
						<Tooltip message="Run execution">
							<PlayIcon />
						</Tooltip>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TicketPlanning
