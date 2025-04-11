import { Button, Card, Input, Modal, ModalContent, ModalTrigger, Textarea, Tooltip } from "@honeycomb-app/design"
import React, { useState } from "react"
import MoreOptionsIcon from "../shared/icons/more-options-icon"
import PlayIcon from "../shared/icons/play-icon"
import PlusIcon from "../shared/icons/plus-icon"
import { useProject } from "../hooks/use-project"
import { runWorkflow } from "../api/project"
import { createNewTicket } from "../api/ticket"
import { Ticket } from "../types/ticket"
import { ticketCreated } from "../reducers/project-reducer"
import { useDispatch } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { WorkflowId, WorkflowStatus } from "../types/workflow-execution"

const TicketPlanning: React.FC<{ tickets: Ticket[] }> = ({ tickets }) => {
	const project = useProject()
	const dispatch = useDispatch()

	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [modalOpened, setModalOpened] = useState(false)

	const handleRunWorkflow = async (ticketId: string) => {
		const workflowExecution = {
			id: uuidv4(),
			workflowId: WorkflowId.CodeGeneration,
			status: WorkflowStatus.Running,
			projectId: project.id,
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
		const ticket = await createNewTicket(project.id, title, description)
		dispatch(ticketCreated(ticket))
		setModalOpened(false)
	}

	return (
		<>
			<div className="ml-4 py-8 px-4 w-1/3 max-w-[400px] h-[calc(100dvh-10rem)]">
				<div className="flex flex-row w-full mb-2">
					<h1 className="text-highlight font-semibold w-fit flex items-center">Tickets</h1>

					<div className="flex justify-end grow">
						<div onClick={() => setModalOpened(true)}>
							<Tooltip message="Create new ticket">
								<PlusIcon />
							</Tooltip>
						</div>
					</div>
				</div>
				<div className="border-b border-secondary-200 w-full" />
				<div className="pb-4">
					{tickets.map((ticket) => (
						<Card key={ticket.id} className="my-4">
							<div className="flex flex-row text-secondary-100 text-sm">{ticket.title}</div>
							<div className="mt-2 flex flex-row gap-2 w-full">
								<Tooltip message="Change status">
									<MoreOptionsIcon />
								</Tooltip>

								<div className="flex grow w-full justify-end cursor-pointer">
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
}

export default TicketPlanning
