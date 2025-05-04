import { SmartFooter, SmartInput, Tooltip } from "@honeycomb-app/design"
import { useSelectedIssue } from "../hooks/store"
import { useLayoutEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { issueUpdated } from "../reducers/workspace-reducer"
import PlayIcon from "../shared/icons/play-icon"
import { leaveComment, updateIssueDescription, updateIssueTitle } from "../api/issue"
import { motion, AnimatePresence } from "framer-motion"
import { getCurrentUser } from "aws-amplify/auth"
import { getActivityComponent } from "./activity/factory"

export default function IssueOverview() {
	const dispatch = useDispatch()
	const issue = useSelectedIssue()
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [commentText, setCommentText] = useState("")

	const handleTitleChange = async (newTitle: string) => {
		if (newTitle === issue.title) return
		setTitle(newTitle)
		const newIssue = { ...issue, title: newTitle }
		const updatedIssue = await updateIssueTitle(newIssue)
		dispatch(issueUpdated(updatedIssue))
	}

	const handleDescriptionChange = async (newDescription: string) => {
		if (newDescription === issue.description) return
		setDescription(newDescription)
		const newIssue = { ...issue, description: newDescription }
		const updatedIssue = await updateIssueDescription(newIssue)
		dispatch(issueUpdated(updatedIssue))
	}

	useLayoutEffect(() => {
		if (issue) {
			setTitle(issue.title)
			setDescription(issue.description)
		}
	}, [issue])

	const handleLeaveComment = async (): Promise<void> => {
		const user = await getCurrentUser()
		const authorId = user.signInDetails?.loginId ?? "You"
		if (commentText.length === 0) return
		const updatedIssue = await leaveComment(issue.id, authorId, commentText)
		dispatch(issueUpdated(updatedIssue))
		setCommentText("")
	}

	return (
		issue && (
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
					<div className="text-progress mt-2">Activities</div>

					<AnimatePresence>
						<div className="mb-2 2xl:mb-5">
							{issue &&
								issue.activities.map((activity: any, index: number) => {
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
		)
	)
}
