import { Button, Card, Input, Modal, ModalContent, ModalTrigger, Textarea, Tooltip } from "@honeycomb-app/design"
import React, { useState } from "react"
import MoreOptionsIcon from "../shared/icons/more-options-icon"
import PlayIcon from "../shared/icons/play-icon"
import PlusIcon from "../shared/icons/plus-icon"
import { useProject } from "../hooks/use-project"
import { develop } from "../api/project"
import { createNewTicket } from "../api/ticket"

const TicketPlanning: React.FC = () => {
	const project = useProject()

	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [modalOpened, setModalOpened] = useState(false)

	const implement = async (feature: string) => {
		await develop(
			{
				projectId: project.id,
				message: feature,
			},
			({}) => {},
			({}) => {},
			({}) => {},
		)
	}

	const createTicket = async () => {
		const ticket = await createNewTicket(project.id, name, description)
		setModalOpened(false)
	}

	return (
		<>
			<div className="ml-4 mt-8 px-4 w-[300px]">
				<div className="flex flex-row w-full h-fit mb-2">
					<h1 className="ml-2 text-base text-sm w-fit flex items-center">Tickets</h1>

					<div className="flex justify-end grow">
						<div onClick={() => setModalOpened(true)}>
							<Tooltip message="Create new ticket">
								<PlusIcon />
							</Tooltip>
						</div>
					</div>
				</div>
				<div className="border-b border-disabled w-full"></div>
				<Card>
					<div className="flex flex-row text-clickable">Implement a note taking app</div>
					<div className="mt-2 flex flex-row gap-2 w-full">
						<Tooltip message="Change status">
							<MoreOptionsIcon />
						</Tooltip>

						<div className="flex grow w-full justify-end">
							<div onClick={() => implement("Implement a note taking app")}>
								<Tooltip message="Run execution">
									<PlayIcon />
								</Tooltip>
							</div>
						</div>
					</div>
				</Card>
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
					<ModalContent title="New ticket">
						<div className="w-[600px] max-w-[90vw]">
							<Input
								placeholder="Ticket title"
								value={name}
								onChange={(e) => setName(e.target.value)}
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
								<Button className="bg-secondary hover:bg-hover-secondary" onClick={createTicket}>
									Create ticket
								</Button>
							</div>
						</div>
					</ModalContent>
				</Modal>
			</div>
		</>
	)
}

export default TicketPlanning
