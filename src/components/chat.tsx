import React, { useState } from "react"
import { motion } from "framer-motion"
import { useProject } from "../util/store"
import { implementRequest } from "../api/project"
import { useDispatch } from "react-redux"
import { messageAdded, sourceCodeUpdated } from "../reducers/editor-reducer"
import PlainIcon from "../icons/plain-icon"
import { Chip } from "@jigjoy-io/ui"

interface Message {
	id: number
	role: "system" | "user"
	content: string
}

const bubbleVariants = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
}

export default function Chat() {
	const project = useProject()

	const dispatch = useDispatch()

	const suggestions = ["Create a website template...", "Create an note taking app..."]

	const [inputValue, setInputValue] = useState("")

	const handleSend = async () => {
		if (!inputValue.trim()) return

		const newMessage: Message = {
			id: Date.now(),
			role: "user",
			content: inputValue.trim(),
		}

		dispatch(messageAdded(newMessage))

		setInputValue("")

		let newSourceCode = await implementRequest({
			id: "id",
			project: project,
			message: newMessage.content,
		})

		console.log(newSourceCode)

		dispatch(
			sourceCodeUpdated({
				...project.sourceCode,
				...newSourceCode,
			}),
		)
	}

	return (
		project && (
			<div className="flex flex-col font-body h-full">
				{/* Main chat container */}
				<div className="flex flex-col bg-surface-1 p-4 rounded shadow-md text-white h-full">
					{/* Message list (scrollable) */}
					<div className="space-y-4 grow overflow-y-auto">
						{project.chatHistory.map((msg, index) => {
							const isUser = msg.role === "user"
							return (
								<div key={msg.id} className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
									{isUser ? (
										<div className="flex items-start space-x-2">
											<img
												className="w-8 h-8 rounded-full"
												src="https://avatars.githubusercontent.com/u/110939072?v=4"
												alt="User Avatar"
											/>
											<motion.div
												variants={bubbleVariants}
												initial="initial"
												animate="animate"
												transition={{ duration: 0.3, delay: index * 0.05 }}
												className="max-w-xs px-3 py-2 rounded bg-clickable text-surface-1"
											>
												{msg.content}
											</motion.div>
										</div>
									) : (
										<div className="flex items-start space-x-2">
											<motion.div
												variants={bubbleVariants}
												initial="initial"
												animate="animate"
												transition={{ duration: 0.3, delay: index * 0.05 }}
												className="max-w-xs px-3 py-2 rounded bg-surface-3 text-white"
											>
												{msg.content}
											</motion.div>
											<img className="w-8 h-8 rounded-full" src="favicon.ico" alt="System Avatar" />
										</div>
									)}
								</div>
							)
						})}
					</div>

					<div className="my-4 h-fit">
						{/* Suggestion chips */}
						{project.chatHistory.length <= 1 && (
							<div className="flex flex-wrap gap-2 justify-center my-4">
								{suggestions.map((text, index) => (
									<Chip
										key={text}
										label={text}
										delay={index}
										onClick={() => {
											setInputValue(text)
											handleSend()
										}}
									/>
								))}
							</div>
						)}

						{/* Message input + send button */}
						<div className="flex items-center space-x-2 mt-auto pt-4 pb-2">
							<input
								type="text"
								placeholder="Type your message..."
								className="flex-1 border border-disabled bg-surface-1 rounded-full 
                      px-3 py-2 text-sm placeholder-base
                      focus:outline-none focus:ring-2 focus:ring-hover"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleSend()}
							/>
							<button
								onClick={handleSend}
								className="bg-primary text-surface-1 px-4 py-2 rounded-full 
                      text-sm hover:bg-hover transition-colors flex items-center justify-center"
								aria-label="Send"
							>
								<PlainIcon />
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	)
}
