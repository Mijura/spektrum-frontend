import { Card, Modal, ModalContent, ModalTrigger, Tooltip } from "@honeycomb-app/design"
import React, { useState } from "react"
import MoreOptionsIcon from "../shared/icons/more-options-icon"
import PlayIcon from "../shared/icons/play-icon"
import PlusIcon from "../shared/icons/plus-icon"
import { useProject } from "../hooks/use-project"
import { develop } from "../api/project"

const TicketPlanning: React.FC = () => {
	const project = useProject()

	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [createTicket, setCreateTicket] = useState(false)

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
	return (
		<>
			<div className="ml-4 mt-8 px-4 w-[300px]">
				<div className="flex flex-row w-full h-fit mb-2">
					<h1 className="ml-2 text-base text-sm w-fit flex items-center">Tickets</h1>

					<div className="flex justify-end grow">
						<div onClick={() => setCreateTicket(true)}>
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
				<Modal onOpenCallback={() => {}} onCloseCallback={() => setCreateTicket(false)}>
					<ModalTrigger>
						<div
							style={{ display: "none" }}
							ref={(el) => {
								if (el && createTicket) {
									el.click()
								}
							}}
						/>
					</ModalTrigger>
					<ModalContent>
						<div className="bg-surface-200 p-8 rounded-lg w-[600px] max-w-[90vw]">
							<h2 className="text-2xl font-bold mb-4 text-clickable">Edit project</h2>
							<form
								onSubmit={(e) => {
									e.preventDefault()
								}}
							>
								<div className="mb-4">
									<label className="block text-sm font-medium text-base mb-2">Name</label>
									<input
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
										className="w-full p-2 rounded bg-surface-300 text-white border border-surface4"
									/>
								</div>
								<div className="mb-4">
									<label className="block text-sm font-medium text-base mb-2">Description</label>
									<textarea
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										className="w-full p-2 rounded bg-surface-300 text-white border border-surface4"
										rows={3}
									/>
								</div>
								<div className="flex justify-end gap-4">
									<button
										type="button"
										onClick={() => setCreateTicket(false)}
										className="px-4 py-2 rounded bg-surface-300 text-white hover:bg-surface4"
									>
										Cancel
									</button>
									<button type="submit" className="px-4 py-2 rounded bg-clickable text-surface-100 hover:bg-hover">
										Save
									</button>
								</div>
							</form>
						</div>
					</ModalContent>
				</Modal>
			</div>
		</>
	)
}

export default TicketPlanning
