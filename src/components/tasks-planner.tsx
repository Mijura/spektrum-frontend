import { Button, Card, Input, Modal, ModalContent, ModalTrigger, Textarea, Tooltip } from "@honeycomb-app/design"
import React, { useState } from "react"
import MoreOptionsIcon from "../shared/icons/more-options-icon"
import PlayIcon from "../shared/icons/play-icon"
import CreateIcon from "../shared/icons/create-icon"
import { createTask } from "../api/task"
import { taskCreated, taskSelected } from "../reducers/workspace-reducer"
import { useDispatch } from "react-redux"
import { useSelectedProject, useSelectedTask } from "../hooks/store"
import { runPrototypingWorkflow } from "../api/workflow-run"
import { getCurrentUser } from "aws-amplify/auth"

const TasksPlanner: React.FC = () => {
	const selectedProject = useSelectedProject()
	const dispatch = useDispatch()

	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const selectedTask = useSelectedTask()
	const [modalOpened, setModalOpened] = useState(false)

	const handleRunWorkflow = async (taskId: string) => {
		const user = await getCurrentUser()
		const userId = user.signInDetails?.loginId

		if (!userId) return

		await runPrototypingWorkflow(taskId, userId)
	}

	const handleCreateTask = async () => {
		setModalOpened(false)
		const createdTask = await createTask(selectedProject.id, title, description)
		dispatch(taskCreated(createdTask))
		return createdTask
	}

	const handleCreateTaskAndRunWorkflow = async () => {
		const task = await handleCreateTask()
		await handleRunWorkflow(task.id)
	}

	return (
		selectedProject && (
			<>
				<div className="px-4 w-full min-w-[300px] max-w-[300px] 2xl:min-w-[325px] 2xl:max-w-[325px] h-[calc(100dvh-50px)]">
					<div className="flex flex-row w-full py-4 items-center">
						<h1 className="text-secondary-100 font-semibold w-fit h-fit">Tasks</h1>

						<div className="flex justify-end grow">
							<div onClick={() => setModalOpened(true)}>
								<Tooltip message="Create new task">
									<CreateIcon />
								</Tooltip>
							</div>
						</div>
					</div>

					<div className="pb-4">
						{selectedProject.tasks &&
							selectedProject.tasks.map((task: any) => (
								<Card
									key={task.id}
									onClick={() => dispatch(taskSelected(task))}
									className={`hover:bg-surface-muted/75 cursor-default my-2 p-3 flex flex-col ${selectedTask?.id === task.id ? "border-highlight border-1" : ""}`}
								>
									<div className="text-secondary-100 text-sm line-clamp-2 w-full">{task.title}</div>
									<div className="mt-2 flex flex-row gap-2 w-full">
										<Tooltip message="Change status">
											<MoreOptionsIcon />
										</Tooltip>

										<div className="flex grow w-full justify-end">
											<div onClick={() => handleRunWorkflow(task.id)}>
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
						<ModalContent title="New task" className="w-[600px] max-w-[90vw]">
							<Input
								placeholder="Task title"
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
								<Button size="sm" variant="primary" onClick={handleCreateTask}>
									Save for later
								</Button>
								<Button size="sm" variant="secondary" onClick={handleCreateTaskAndRunWorkflow}>
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

export default TasksPlanner
