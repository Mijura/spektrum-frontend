import { SmartFooter, SmartInput, Tooltip } from "@honeycomb-app/design"
import { useSelectedTicket } from "../hooks/store"
import { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { ticketSelected, ticketUpdated } from "../reducers/workspace-reducer"
import PlayIcon from "../shared/icons/play-icon"
import { WorkerIcon } from "../shared/icons/worker-icon"
import { WorkerLoader } from "../shared/icons/worker-loader"
import { updateTicketDescription, updateTicketTitle } from "../api/ticket"
import TimelineIcon from "../shared/icons/timeline-icon"
import { formatTimestamp } from "../shared/util"

export default function TicketOverview() {
	const dispatch = useDispatch()
	const ticket = useSelectedTicket()
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [comment, setComment] = useState("")

	const handleTitleChange = async (newTitle: string) => {
		if (newTitle === ticket.title) return
		setTitle(newTitle)
		const newTicket = { ...ticket, title: newTitle }
		const updatedTicket = await updateTicketTitle(newTicket)
		dispatch(ticketUpdated(updatedTicket))
	}

	const handleDescriptionChange = async (newDescription: string) => {
		if (newDescription === ticket.description) return
		setDescription(newDescription)
		const newTicket = { ...ticket, description: newDescription }
		const updatedTicket = await updateTicketDescription(newTicket)
		dispatch(ticketUpdated(updatedTicket))
	}

	useEffect(() => {
		return () => {
			dispatch(ticketSelected(null))
		}
	}, [])

	useLayoutEffect(() => {
		if (ticket) {
			setTitle(ticket.title)
			setDescription(ticket.description)
		}
	}, [ticket])

	const handleRunWorkflow = () => {}

	return (
		ticket && (
			<div className="text-secondary-100 flex grow justify-center">
				<div className="flex flex-col max-w-full w-[500px] 2xl:w-[700px] mt-20 gap-4">
					<SmartInput
						className="bg-[#1a1a1a] border-none w-full min-h-10 text-xl p-0"
						value={title}
						placeholder="Add title..."
						onChange={setTitle}
						onBlur={handleTitleChange}
					/>
					<SmartInput
						className="bg-[#1a1a1a] w-full "
						value={description}
						placeholder="Add description..."
						onBlur={handleDescriptionChange}
						onChange={setDescription}
					>
						<SmartFooter className="text-xs bg-surface italic">*Ticket description</SmartFooter>
					</SmartInput>
					<div className="text-progress mt-2">Activities</div>

					<div className="mb-5">
						{ticket.activities.map((activity: any, index: number) => {
							return (
								<div key={activity.id}>
									<div className="flex flex-row gap-x-3 items-center px-1 text-sm">
										<TimelineIcon />
										<div>{activity.metadata.message}</div>
										<div className="text-xs italic">{formatTimestamp(activity.occurredAt)}</div>
									</div>

									{index !== ticket.activities.length - 1 && (
										<div>
											<div className="flex justify-center w-[24px]">
												<div className="border-l justify-between"></div>
												<div className="h-fit flex w-fit justify-center">
													<div className="h-[12px] rounded-sm w-full"></div>
												</div>
											</div>
										</div>
									)}
								</div>
							)
						})}
					</div>

					{/* <WorkerLoader />
					<WorkerIcon /> */}
					<SmartInput
						className="focus:ring-0 rounded-sm text-sm w-full resize-none h-auto "
						value={comment}
						onChange={setComment}
						placeholder="Comment to re-run workflow…"
					>
						<SmartFooter>
							<div className="flex items-end justify-end mx-1" onClick={handleRunWorkflow}>
								<Tooltip message="Re-run workflow">
									<PlayIcon color="text-highlight" />
								</Tooltip>
							</div>
						</SmartFooter>
					</SmartInput>
				</div>
			</div>
		)
	)
}
