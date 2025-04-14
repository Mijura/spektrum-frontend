import { Input, Textarea } from "@honeycomb-app/design"
import { useSelectedTicket } from "../hooks/store"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { updateTicket } from "../api/ticket"
import { useDispatch } from "react-redux"
import { ticketUpdated } from "../reducers/workspace-reducer"

export default function TicketOverview() {
	const dispatch = useDispatch()
	const ticket = useSelectedTicket()
	const [title, setTitle] = useState(ticket.title)
	const [description, setDescription] = useState(ticket.description)

	const descriptionRef = useRef<HTMLTextAreaElement>(null)

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
		console.log(descriptionRef.current)
		if (descriptionRef.current) {
			//descriptionRef.current.style.height = "auto"
			descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`
		}
	}, [descriptionRef])

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
				<div className="flex flex-col w-full max-w-[700px] mt-20 gap-4">
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
					{/*
					<div>Activities</div>
					*/}
					<div
						className="bg-surface-muted mt-20 border border-secondary-200 rounded-sm text-sm w-full resize-none min-h-20 h-auto overflow-hidden "
						contentEditable
						//onChange={(e) => increaseTextareaHeight(e.target)}
					/>
				</div>
			</div>
		)
	)
}
