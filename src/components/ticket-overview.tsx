import { Chip, SmartFooter, SmartInput, Tooltip } from "@honeycomb-app/design"
import { useSelectedTicket } from "../hooks/store"
import { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { ticketSelected, ticketUpdated } from "../reducers/workspace-reducer"
import PlayIcon from "../shared/icons/play-icon"
import { WorkerIcon } from "../shared/icons/worker-icon"
import { WorkerLoader } from "../shared/icons/worker-loader"
import { leaveComment, updateTicketDescription, updateTicketTitle } from "../api/ticket"
import { formatTimestamp } from "../shared/util"
import { motion, AnimatePresence } from "framer-motion"
import CreateIcon from "../shared/icons/create-icon"
import EditIcon from "../shared/icons/edit-icon"
import { getCurrentUser } from "aws-amplify/auth"

export default function TicketOverview() {
	const dispatch = useDispatch()
	const ticket = useSelectedTicket()
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [commentText, setCommentText] = useState("")

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

	const handleLeaveComment = async (): Promise<void> => {
		const user = await getCurrentUser()
		const authorId = user.signInDetails?.loginId ?? "You"
		if (commentText.length === 0) return
		const updatedTicket = await leaveComment(ticket.id, authorId, commentText)
		dispatch(ticketUpdated(updatedTicket))
		setCommentText("")
	}

	return (
		ticket && (
			<div className="text-secondary-100 flex h-[calc(100vh-50px)] grow justify-center overflow-y-auto">
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
					></SmartInput>
					<div className="text-progress mt-2">Activities</div>

					<div className="mb-2 2xl:mb-5">
						<AnimatePresence>
							{ticket.activities.map((activity: any, index: number) => {
								return (
									<motion.div
										key={activity.id}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.3,
											delay: index * 0.1,
											ease: "easeOut",
										}}
									>
										{activity.type === "Commented" ? (
											<div className="w-full flex">
												<div className="w-full flex flex-row items-center p-1 2xl:p-2 text-sm">
													<motion.div
														className="italic bg-surface-light rounded-sm p-1 2xl:p-2 w-full"
														transition={{ duration: 0.2 }}
													>
														<div className="flex flex-row gap-x-2 items-center">
															<Chip label={activity.userId} className="bg-surface text-highlight-200" />
															<span className="text-xs italic">{formatTimestamp(activity.occurredAt)}</span>
														</div>
														<div className="p-1 2xl:p-2">
															{ticket.comments.find((comment: any) => comment.id === activity.metadata.commentId).text}
														</div>
													</motion.div>
												</div>
											</div>
										) : (
											<div className="flex w-full items-center 2xl:gap-y-4 h-fit">
												<div className="w-fit h-fit mx-1">{activity.type === "TicketCreated" ? <CreateIcon /> : <EditIcon />}</div>
												<motion.div className="flex flex-col gap-x-3 text-sm p-2 rounded-sm" transition={{ duration: 0.2 }}>
													<div className="flex flex-row gap-x-1 items-center">
														<span className="text-xs italic">
															<span className="text-secondary mr-2">{formatTimestamp(activity.occurredAt)}</span>
															{activity.metadata.message}
														</span>
													</div>
													<div className="text-xs italic"></div>
												</motion.div>
											</div>
										)}
									</motion.div>
								)
							})}
						</AnimatePresence>
					</div>

					{/* <WorkerLoader />
					<WorkerIcon /> */}
					<div className="pb-10">
						<SmartInput
							className="focus:ring-0 rounded-sm text-sm w-full resize-none h-auto"
							value={commentText}
							onChange={setCommentText}
							placeholder="Comment to re-run workflow…"
						>
							<SmartFooter>
								<div className="flex items-end justify-end mx-1" onClick={handleLeaveComment}>
									<Tooltip message="Re-run workflow">
										<PlayIcon color="text-highlight" />
									</Tooltip>
								</div>
							</SmartFooter>
						</SmartInput>
					</div>
				</div>
			</div>
		)
	)
}
