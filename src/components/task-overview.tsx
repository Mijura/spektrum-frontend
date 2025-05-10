import { Button, SmartFooter, SmartInput, Tooltip } from "@honeycomb-app/design"
import { useSelectedProject, useSelectedTask } from "../hooks/store"
import { useLayoutEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { taskUpdated } from "../reducers/workspace-reducer"
import PlayIcon from "../shared/icons/play-icon"
import { leaveComment, updateTaskDescription, updateTaskTitle } from "../api/task"
import { motion, AnimatePresence } from "framer-motion"
import { getCurrentUser } from "aws-amplify/auth"
import { getActivityComponent } from "./activity/factory"
import TasksIcon from "../shared/icons/tasks-icon"

export default function TaskOverview() {
	const dispatch = useDispatch()
	const task = useSelectedTask()
	const selectedProject = useSelectedProject()
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [commentText, setCommentText] = useState("")

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

	const handleLeaveComment = async (): Promise<void> => {
		const user = await getCurrentUser()
		const authorId = user.signInDetails?.loginId
		if (!authorId) return
		if (commentText.length === 0) return
		const updatedTask = await leaveComment(task.id, authorId, commentText)
		dispatch(taskUpdated(updatedTask))
		setCommentText("")
	}

	return (
		<>
			{task && (
				<div className="text-secondary-100 flex h-[calc(100vh-50px)] grow justify-center overflow-y-auto">
					<div className="flex flex-col max-w-full w-[500px] 2xl:w-[700px] mt-20 gap-4">
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
						<div className="text-progress">Activity Feed</div>

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
						</AnimatePresence>
					</div>
				</div>
			)}

			{selectedProject.tasks.length === 0 && (
				<div className="w-full flex mt-40 justify-center h-fit">
					<div className="flex flex-col gap-y-2 w-full max-w-[400px]">
						<TasksIcon />
						<div className="font-semibold text-highlight-100 mt-4">Tasks</div>
						<div className="text-secondary-100 text-sm">
							Get started by creating your first task. Define what needs to be done, and our AI workers will handle the
							execution.
						</div>
						<div className="mt-4">
							<Button>Create first task</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
