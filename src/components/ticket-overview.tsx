import { Input, Textarea, Tooltip } from "@honeycomb-app/design"
import { useSelectedTicket } from "../hooks/store"
import { useLayoutEffect, useRef, useState } from "react"
import { updateTicket } from "../api/ticket"
import { useDispatch } from "react-redux"
import { ticketUpdated } from "../reducers/workspace-reducer"
import PlayIcon from "../shared/icons/play-icon"
import { WorkerIcon } from "../shared/icons/worker-icon"
import { WorkerLoader } from "../shared/icons/worker-loader"

export default function TicketOverview() {
	const dispatch = useDispatch()
	const ticket = useSelectedTicket()
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const descriptionRef = useRef<HTMLTextAreaElement>(null)

	const [comment, setComment] = useState("")
	const commentPlaceholder = "Comment to re-run workflow…"

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

	useLayoutEffect(() => {
		setTitle(ticket.title)
		setDescription(ticket.description)
	}, [ticket])

	const increaseTextareaHeight = (element: HTMLTextAreaElement | HTMLInputElement | null) => {
		console.log(element)
		if (element) {
			//element.style.height = "auto"
			element.style.height = `${element.scrollHeight}px`
		}
	}

	return (
		ticket && (
			<div className="text-secondary-100 flex grow justify-center">
				<div className="flex flex-col max-w-full w-[500px] 2xl:w-[700px] mt-20 gap-4">
					<Input className="bg-[#1a1a1a] focus:ring-0 rounded-sm text-xl w-full" value={title} onBlur={handleTitleChange} />
					<Textarea
						className={`bg-[#1a1a1a] focus:ring-0 rounded-sm text-sm w-full resize-none h-auto `}
						value={description}
						placeholder="Add description..."
						onBlur={handleDescriptionChange}
						onChange={(e) => increaseTextareaHeight(e.target)}
						ref={descriptionRef}
					/>
					<div className="w-full border-t border-secondary-200"></div>
					<div>Activities</div>

					<div className="flex items-end justify-end mx-1">
						<Tooltip message="Re-run workflow">
							<PlayIcon color="text-highlight" />
						</Tooltip>
					</div>

					<WorkerLoader />
					<WorkerIcon />
				</div>
			</div>
		)
	)
}
