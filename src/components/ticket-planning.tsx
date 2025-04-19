import { Button, Card, Input, Modal, ModalContent, ModalTrigger, Textarea, Tooltip } from "@honeycomb-app/design"
import React, { useState } from "react"
import MoreOptionsIcon from "../shared/icons/more-options-icon"
import PlayIcon from "../shared/icons/play-icon"
import PlusIcon from "../shared/icons/plus-icon"
import { runWorkflow } from "../api/project"
import { createNewTicket } from "../api/ticket"
import { ticketCreated, ticketSelected } from "../reducers/workspace-reducer"
import { useDispatch } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { WorkflowId, WorkflowStatus } from "../types/workflow-execution"
import { useSelectedProject, useSelectedTicket } from "../hooks/store"
const TicketPlanning: React.FC = () => {
	const selectedProject = useSelectedProject()
	const dispatch = useDispatch()

	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const selectedTicket = useSelectedTicket()
	const [modalOpened, setModalOpened] = useState(false)

	const handleRunWorkflow = async (ticketId: string) => {
		const workflowExecution = {
			id: uuidv4(),
			workflowId: WorkflowId.CodeGeneration,
			status: WorkflowStatus.Running,
			projectId: selectedProject.id,
			ticketId: ticketId,
		}

		await runWorkflow(
			workflowExecution,
			({}) => {},
			({}) => {},
			({}) => {},
		)
	}

	const createTicket = async () => {
		const ticket = await createNewTicket(selectedProject.id, title, description)
		dispatch(ticketCreated(ticket))
		setModalOpened(false)
	}

	return (
		selectedProject && (
			<>
				<div className="px-4 w-full min-w-[325px] max-w-[325px] h-[calc(100dvh-50px)]">
					<div className="flex flex-row w-full py-4 items-center">
						<h1 className="text-secondary-100 font-semibold w-fit h-fit">Tickets</h1>

						<div className="flex justify-end grow">
							<div onClick={() => setModalOpened(true)}>
								<Tooltip message="Create new ticket">
									<PlusIcon />
								</Tooltip>
							</div>
						</div>
					</div>

					<div className="pb-4">
						{selectedProject.tickets &&
							selectedProject.tickets.map((ticket: any) => (
								<Card
									key={ticket.id}
									onClick={() => dispatch(ticketSelected(ticket))}
									className={`hover:bg-surface-muted/75 cursor-default my-2 p-3 flex flex-col ${selectedTicket?.id === ticket.id ? "border-highlight border-1" : ""}`}
								>
									<div className="text-secondary-100 text-sm line-clamp-2 w-full">{ticket.title}</div>
									<div className="mt-2 flex flex-row gap-2 w-full">
										<Tooltip message="Change status">
											<MoreOptionsIcon />
										</Tooltip>

										<div className="flex grow w-full justify-end">
											<div onClick={() => handleRunWorkflow(ticket.id)}>
												<Tooltip message="Run workflow">
													<PlayIcon />
												</Tooltip>
											</div>
										</div>
									</div>
								</Card>
							))}
					</div>
				</div>

				<div className="flex flex-row w-[300px] h-fit">
					<Modal isOpen={modalOpened} onOpenCallback={() => {}} onCloseCallback={() => setModalOpened(false)}>
						<ModalTrigger>
							<div
								style={{ display: "none" }}
								ref={(el) => {
									if (el && modalOpened) {
										el.click()
									}
								}}
							/>
						</ModalTrigger>
						<ModalContent title="New ticket" className="w-[600px] max-w-[90vw]">
							<Input
								placeholder="Ticket title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="mb-4 w-full"
							/>
							<Textarea
								placeholder="Add description..."
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="mb-4 w-full"
								rows={4}
							/>
							<div className="flex justify-end gap-4">
								<Button variant="secondary" onClick={createTicket}>
									Create ticket
								</Button>
							</div>
						</ModalContent>
					</Modal>
				</div>
			</>
		)
	)
}

export default TicketPlanning
