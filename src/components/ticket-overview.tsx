import { Button, Input, SmartFooter, SmartInput, Textarea, Tooltip } from "@honeycomb-app/design"
import { useSelectedTicket } from "../hooks/store"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { updateTicket } from "../api/ticket"
import { useDispatch } from "react-redux"
import { ticketSelected, ticketUpdated } from "../reducers/workspace-reducer"
import PlayIcon from "../shared/icons/play-icon"
import { WorkerIcon } from "../shared/icons/worker-icon"
import { WorkerLoader } from "../shared/icons/worker-loader"

export default function TicketOverview() {
	const dispatch = useDispatch()
	const ticket = useSelectedTicket()
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [comment, setComment] = useState("")

	const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value)
		const newTicket = { ...ticket, title: e.target.value }
		dispatch(ticketUpdated(newTicket))
		await updateTicket(newTicket)
	}

	const handleDescriptionChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(e.target.value)
		const newTicket = { ...ticket, description: e.target.value }
		dispatch(ticketUpdated(newTicket))
		await updateTicket({ ...ticket, description: e.target.value })
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

	return (
		ticket && (
			<div className="text-secondary-100 flex grow justify-center">
				<div className="flex flex-col max-w-full w-[500px] 2xl:w-[700px] mt-20 gap-4">
					<SmartInput
						className="bg-[#1a1a1a] border-none w-full min-h-10 text-xl p-0"
						value={title}
						placeholder="Add title..."
						type="text"
						onChange={setTitle}
					/>
					<SmartInput
						className="bg-[#1a1a1a] border-none text-sm w-full p-0"
						value={description}
						placeholder="Add description..."
						type="textarea"
						onChange={setDescription}
					/>
					<div className="w-full border-t border-secondary-200"></div>
					<div>Activities</div>

					<WorkerLoader />
					<WorkerIcon />
					<SmartInput
						className="bg-[#1a1a1a] focus:ring-0 rounded-sm text-sm w-full resize-none h-auto "
						value={comment}
						onChange={setComment}
						placeholder="Comment to re-run workflow…"
						type="textarea"
					>
						<SmartFooter>
							<div className="flex items-end justify-end mx-1">
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
