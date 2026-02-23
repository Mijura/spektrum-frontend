import { Button, SmartFooter, SmartInput, Tooltip, Modal, ModalContent, Textarea } from "@jigjoy-ai/ui-library"
import { useSelectedProject, useSelectedTask, useUserData } from "../hooks/store"
import { useLayoutEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { addTasksToProject, taskCreationRequested, taskUpdated } from "../reducers/workspace-reducer"
import PlayIcon from "../shared/icons/play-icon"
import { leaveComment, updateTaskDescription, updateTaskTitle } from "../api/project-planning"
import { motion, AnimatePresence } from "framer-motion"
import { getActivityComponent } from "./activity/factory"
import TasksIcon from "../shared/icons/tasks-icon"
import { planTasksWithAI } from "../api/project-planning"
import { developModule } from "../api/ai-coding"
import { ActivityType, CommentLeftActivity, CommentLeftMetadata } from "@jigjoy-ai/task-contracts"
import { v4 as uuidv4 } from "uuid"

export default function TaskOverview() {
	const dispatch = useDispatch()
	const task = useSelectedTask()
	const selectedProject = useSelectedProject()
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [commentText, setCommentText] = useState("")
	const [aiTaskModalOpened, setAiTaskModalOpened] = useState(false)
	const [projectDescription, setProjectDescription] = useState("")
	const [isPlanningTasks, setIsPlanningTasks] = useState(false)
	const projectDescriptionRef = useRef<HTMLTextAreaElement>(null)
	const userData = useUserData()

	const handleTitleChange = async (newTitle: string) => {
		if (newTitle === task.title) return
		setTitle(newTitle)
		const newTask = { ...task, title: newTitle }
		const updatedTask = await updateTaskTitle(newTask)
		dispatch(taskUpdated(updatedTask))
	}

	const handleDescriptionChange = async (newDescription: string) => {
		if (newDescription === task.description) return
		setDescription(newDescription)
		const newTask = { ...task, description: newDescription }
		const updatedTask = await updateTaskDescription(newTask)
		dispatch(taskUpdated(updatedTask))
	}

	useLayoutEffect(() => {
		if (task) {
			setTitle(task.title)
			setDescription(task.description)
		}
	}, [task])

	const handleCommentLeft = async (): Promise<void> => {
		if (commentText.length === 0) return

		const commentMetadata: CommentLeftMetadata = {
			commentText: commentText,
			authorId: userData.userEmail,
		}

		const commentLeftActivity: CommentLeftActivity = {
			id: uuidv4(),
			type: ActivityType.COMMENT_LEFT,
			projectId: task.projectId,
			taskId: task.id,
			userId: userData.userEmail,
			occurredAt: new Date().toISOString(),
			metadata: commentMetadata,
		}

		setCommentText("")

		const mockTaskWithComment = { ...task, activities: [...task.activities, commentLeftActivity] }
		dispatch(taskUpdated(mockTaskWithComment))

		const taskWithComment = await leaveComment(task.id, commentMetadata.commentText)
		dispatch(taskUpdated(taskWithComment)) // update the task with real comment left activity

		await developModule(taskWithComment)
	}

	const handlePlanTasksWithAI = async () => {
		setIsPlanningTasks(true)
		try {
			const tasks = await planTasksWithAI(selectedProject.id, projectDescription)
			dispatch(addTasksToProject(tasks))
			setProjectDescription("")
			setAiTaskModalOpened(false)
		} catch (error) {
			console.error("Error planning tasks:", error)
		} finally {
			setIsPlanningTasks(false)
		}
	}

	return (
		<>
			{task && (
				<div className="text-secondary-100 flex h-fit md:h-[calc(100vh-50px)] grow justify-center overflow-y-auto">
					<div className="flex flex-col w-[420px] md:w-[420px] xl:w-[500px] 2xl:w-[700px] md:mt-20 gap-4 p-10 md:p-0">
						<SmartInput
							className="bg-[#1a1a1a] border-none w-full min-h-10 mb-2 text-xl p-0"
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
						<div className="text-progress">Activities</div>

						<AnimatePresence>
							<div className="flex flex-col gap-y-4">
								{task &&
									task.activities.map((activity: any, index: number) => {
										return (
											<AnimatePresence>
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
													{getActivityComponent(activity)}
												</motion.div>
											</AnimatePresence>
										)
									})}
							</div>
							<div className="pb-10">
								<SmartInput
									className="focus:ring-0 rounded-sm text-sm w-full resize-none h-auto"
									value={commentText}
									onChange={setCommentText}
									placeholder="Comment to re-run task…"
								>
									<SmartFooter>
										<div className="flex items-end justify-end mx-1" onClick={handleCommentLeft}>
											<Tooltip message="Re-run task">
												<PlayIcon color="text-highlight" />
											</Tooltip>
										</div>
									</SmartFooter>
								</SmartInput>
							</div>
						</AnimatePresence>
					</div>
				</div>
			)}

			{selectedProject.tasks.length === 0 && (
				<div className="w-full flex mt-8 md:mt-40 justify-center h-fit">
					<div className="flex flex-col gap-y-3 w-full md:w-[400px] px-8 md:px-0">
						<TasksIcon />
						<div className="font-semibold text-highlight-100 mt-4">Tasks</div>
						<div className="text-secondary-100 text-sm">
							Projects are broken down into tasks, which are small jobs that the AI workers complete.
						</div>
						<div className="text-secondary-100 text-sm">
							Define what needs to be done, and our AI workers will handle the task execution.
						</div>
						<div className="flex flew-row gap-2">
							<div>
								<Button onClick={() => dispatch(taskCreationRequested())}>Create task manually</Button>
							</div>
							<div>
								<Button size="sm" variant="secondary" onClick={() => setAiTaskModalOpened(true)}>
									Plan features with AI
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* AI Task Planning Modal */}
			<Modal
				isOpen={aiTaskModalOpened}
				onOpenCallback={() => {
					// Focus the textarea when modal opens
					setTimeout(() => {
						projectDescriptionRef.current?.focus()
					}, 200)
				}}
				onCloseCallback={() => setAiTaskModalOpened(false)}
			>
				<ModalContent
					title="Plan Tasks with AI"
					className="w-full md:w-[65vw] xl:w-[50vw] 2xl:w-[30vw] max-w-[90vw]"
				>
					<Textarea
						ref={projectDescriptionRef}
						placeholder="Describe what you want to build..."
						value={projectDescription}
						onChange={(e) => setProjectDescription(e.target.value)}
						className="mb-4 w-full"
						rows={10}
					/>
					<div className="flex justify-end gap-2">
						<Button
							size="sm"
							variant="primary"
							onClick={() => setAiTaskModalOpened(false)}
							disabled={isPlanningTasks}
						>
							Cancel
						</Button>
						<Button size="sm" variant="secondary" onClick={handlePlanTasksWithAI} loading={isPlanningTasks}>
							Plan Features
						</Button>
					</div>
				</ModalContent>
			</Modal>
		</>
	)
}
