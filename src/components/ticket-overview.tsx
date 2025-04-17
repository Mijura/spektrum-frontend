import { SmartFooter, SmartInput, Tooltip } from "@honeycomb-app/design"
import { useSelectedTicket } from "../hooks/store"
import { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { ticketSelected, ticketUpdated } from "../reducers/workspace-reducer"
import PlayIcon from "../shared/icons/play-icon"
import { WorkerIcon } from "../shared/icons/worker-icon"
import { WorkerLoader } from "../shared/icons/worker-loader"
import { updateTicketTitle } from "../api/ticket"

export default function TicketOverview() {
	const dispatch = useDispatch()
	const ticket = useSelectedTicket()
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [comment, setComment] = useState("")

	const handleTitleChange = async (newTitle: string) => {
		setTitle(newTitle)
		const newTicket = { ...ticket, title: newTitle }
		dispatch(ticketUpdated(newTicket))
		await updateTicketTitle(newTicket)
	}

	const handleDescriptionChange = async (newDescription: string) => {
		setDescription(newDescription)
		const newTicket = { ...ticket, description: newDescription }
		dispatch(ticketUpdated(newTicket))
		await updateTicketTitle({ ...ticket, description: newDescription })
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

	const handleRunWorkflow = () => {
		console.log(ticket)
		console.log("run workflow")
	}

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

					<WorkerLoader />
					<WorkerIcon />
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
