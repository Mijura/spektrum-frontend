import { Input, Textarea } from "@honeycomb-app/design"
import { useSelectedTicket } from "../hooks/store"
import { useLayoutEffect, useRef, useState } from "react"
import { updateTicket } from "../api/ticket"
import { useDispatch } from "react-redux"
import { ticketUpdated } from "../reducers/workspace-reducer"
import PlayIcon from "../shared/icons/play-icon"

export default function TicketOverview() {
	const dispatch = useDispatch()
	const ticket = useSelectedTicket()
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [comment, setComment] = useState("")
	const descriptionRef = useRef<HTMLTextAreaElement>(null)
	const editableRef = useRef<HTMLDivElement>(null)
	const [isEmpty, setIsEmpty] = useState(true)
	const placeholder = "Comment to re-run workflow…"

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

	const placeCursorAtStart = () => {
		const el = editableRef.current
		if (!el) return

		const range = document.createRange()
		const sel = window.getSelection()

		range.setStart(el, 0)
		range.collapse(true)

		sel?.removeAllRanges()
		sel?.addRange(range)
	}

	const handleInput = () => {
		const text = editableRef.current?.innerText ?? ""
		setIsEmpty(text.trim() === "")
	}

	const increaseTextareaHeight = (element: HTMLTextAreaElement | HTMLInputElement | null) => {
		console.log(element)
		if (element) {
			//element.style.height = "auto"
			element.style.height = `${element.scrollHeight}px`
		}
	}

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!editableRef.current) return
		editableRef.current?.blur()
		// Only hijack if it's empty and we're simulating placeholder
		if (isEmpty) {
			e.preventDefault() // Prevent default cursor placement
			editableRef.current.focus()
			placeCursorAtStart()
		}
	}

	const handleBlur = () => {
		const sel = window.getSelection()
		if (sel?.rangeCount) {
			sel.removeAllRanges() // remove lingering selection
		}

		// Just to be sure, remove focus programmatically
		editableRef.current?.blur()
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
					{/*
					<div>Activities</div>
					*/}
					<div
						className="relative outline-none bg-surface-muted border 
							border-secondary-200 rounded"
					>
						{isEmpty && <span className="absolute top-2 left-2 text-secondary/70 pointer-events-none">{placeholder}</span>}
						<p
							className={`rounded-sm text-sm w-full p-2
							resize-none min-h-20 h-auto overflow-hidden whitespace-pre-wrap 
							focus:outline-none 
							${isEmpty ? "" : "text-secondary"}`}
							contentEditable
							suppressContentEditableWarning
							onMouseDown={handleMouseDown}
							onInput={handleInput}
							onChange={(e: React.ChangeEvent<HTMLDivElement>) => setComment(e.target.innerText)}
							ref={editableRef}
						/>
						<div className="w-full bottom-2 right-2 bg-surface-light h-fit p-1.5">
							<div className="flex items-end justify-end">
								<PlayIcon />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	)
}
