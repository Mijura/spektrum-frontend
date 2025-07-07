import { Button, Card, Input, Modal, ModalContent, ModalTrigger, Textarea, Tooltip } from "@honeycomb-app/design"
import React, { useEffect, useState } from "react"
import MoreOptionsIcon from "../shared/icons/more-options-icon"
import PlayIcon from "../shared/icons/play-icon"
import CreateIcon from "../shared/icons/create-icon"
import { createTask } from "../api/task"
import { taskCreated, taskCreationClosed, taskCreationRequested, taskSelected } from "../reducers/workspace-reducer"
import { useDispatch } from "react-redux"
import { useSelectedProject, useSelectedTask, useTaskCreationRequested } from "../hooks/store"
import { runFrontendDevelomentWorkflow } from "../api/workflow-run"
import { getCurrentUser } from "aws-amplify/auth"

const TasksPlanner: React.FC = () => {
	const selectedProject = useSelectedProject()
	const dispatch = useDispatch()

	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const selectedTask = useSelectedTask()
	const taskCreationModalOpened = useTaskCreationRequested()

	const handleRunWorkflow = async (taskId: string) => {
		const user = await getCurrentUser()
		const userId = user.signInDetails?.loginId

		if (!userId) return

		await runFrontendDevelomentWorkflow(taskId, userId)
	}

	const handleCreateTask = async () => {
		const createdTask = await createTask(selectedProject.id, title, description)
		dispatch(taskCreated(createdTask))
		return createdTask
	}

	const handleCreateTaskAndRunWorkflow = async () => {
		const task = await handleCreateTask()
		await handleRunWorkflow(task.id)
	}

	useEffect(() => {
		setTitle("")
		setDescription("")
	}, [taskCreationModalOpened])

	return (
		selectedProject && (
			<>
				<div className="w-full md:w-[300px] h-fit md:h-[calc(100dvh-50px)] p-3 flex items-center justify-between md:justify-start md:flex-col">
					<div className="flex px-8 md:px-0 flex-row items-center justify-between w-full">
						<div className="text-secondary-100 font-semibold h-fit w-full">Tasks</div>
						<div className="grow justify-end">
							<div onClick={() => dispatch(taskCreationRequested())}>
								<Tooltip message="Create new task">
									<CreateIcon />
								</Tooltip>
							</div>
						</div>
					</div>

					<div className="pb-4 w-full">
						{selectedProject.tasks &&
							selectedProject.tasks.map((task: any) => (
								<Card
									key={task.id}
									onClick={() => dispatch(taskSelected(task))}
									className={`hidden md:flex hover:bg-surface-muted/75 cursor-default my-2 p-3 flex-col ${selectedTask?.id === task.id ? "border-highlight border-1" : ""}`}
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

				<div className="flex flex-row w-[300px] h-fit z-40">
					<Modal
						isOpen={taskCreationModalOpened}
						onOpenCallback={() => {}}
						onCloseCallback={() => dispatch(taskCreationClosed())}
					>
						<ModalTrigger>
							<div
								style={{ display: "none" }}
								ref={(el) => {
									if (el && taskCreationModalOpened) {
										el.click()
									}
								}}
							/>
						</ModalTrigger>
						<ModalContent title="New task" className="w-full md:w-[600px] max-w-[90vw]">
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
									Start execution
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
