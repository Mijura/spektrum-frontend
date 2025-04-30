import { Button, Card, Input, Modal, ModalContent, ModalTrigger, Textarea, Tooltip } from "@honeycomb-app/design"
import React, { useState } from "react"
import MoreOptionsIcon from "../shared/icons/more-options-icon"
import PlayIcon from "../shared/icons/play-icon"
import CreateIcon from "../shared/icons/create-icon"
import { createIssue } from "../api/issue"
import { issueCreated, issueSelected } from "../reducers/workspace-reducer"
import { useDispatch } from "react-redux"
import { useSelectedProject, useSelectedIssue } from "../hooks/store"
import { runPrototypingWorkflow } from "../api/workflow-run"

const Planning: React.FC = () => {
	const selectedProject = useSelectedProject()
	const dispatch = useDispatch()

	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const selectedIssue = useSelectedIssue()
	const [modalOpened, setModalOpened] = useState(false)

	const handleRunWorkflow = async (issueId: string) => {
		await runPrototypingWorkflow(issueId)
	}

	const handleCreateIssue = async () => {
		setModalOpened(false)
		const createdIssue = await createIssue(selectedProject.id, title, description)
		dispatch(issueCreated(createdIssue))
		return createdIssue
	}

	const handleCreateIssueAndRunWorkflow = async () => {
		const issue = await handleCreateIssue()
		await handleRunWorkflow(issue.id)
	}

	return (
		selectedProject && (
			<>
				<div className="px-4 w-full min-w-[325px] max-w-[325px] h-[calc(100dvh-50px)]">
					<div className="flex flex-row w-full py-4 items-center">
						<h1 className="text-secondary-100 font-semibold w-fit h-fit">Issues</h1>

						<div className="flex justify-end grow">
							<div onClick={() => setModalOpened(true)}>
								<Tooltip message="Create new issue">
									<CreateIcon />
								</Tooltip>
							</div>
						</div>
					</div>

					<div className="pb-4">
						{selectedProject.issues &&
							selectedProject.issues.map((issue: any) => (
								<Card
									key={issue.id}
									onClick={() => dispatch(issueSelected(issue))}
									className={`hover:bg-surface-muted/75 cursor-default my-2 p-3 flex flex-col ${selectedIssue?.id === issue.id ? "border-highlight border-1" : ""}`}
								>
									<div className="text-secondary-100 text-sm line-clamp-2 w-full">{issue.title}</div>
									<div className="mt-2 flex flex-row gap-2 w-full">
										<Tooltip message="Change status">
											<MoreOptionsIcon />
										</Tooltip>

										<div className="flex grow w-full justify-end">
											<div onClick={() => handleRunWorkflow(issue.id)}>
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
						<ModalContent title="New issue" className="w-[600px] max-w-[90vw]">
							<Input
								placeholder="Issue title"
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
							<div className="flex justify-end gap-2">
								<Button size="sm" variant="primary" onClick={handleCreateIssue}>
									Save for later
								</Button>
								<Button size="sm" variant="secondary" onClick={handleCreateIssueAndRunWorkflow}>
									Create & run workflow
								</Button>
							</div>
						</ModalContent>
					</Modal>
				</div>
			</>
		)
	)
}

export default Planning
