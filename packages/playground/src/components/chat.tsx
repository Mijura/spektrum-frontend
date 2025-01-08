import React, { useState } from "react"
import { motion } from "framer-motion"
import { useSandpack } from "@codesandbox/sandpack-react"
import { refactorProject } from "../api/project"
import { useDispatch } from "react-redux"
import { projectUpdated } from "../reducers/editor-reducer"
import PlainIcon from "../icons/plain-icon"

interface Message {
	id: number
	role: "system" | "user"
	content: string
}

const bubbleVariants = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
}

export const Chat: React.FC = () => {
	const { sandpack } = useSandpack()
	const { files, activeFile } = sandpack

	const dispatch = useDispatch()

	const [messages, setMessages] = useState<Message[]>([
		{
			id: 1,
			role: "system",
			content: "Welcome to the chat! How can I help you?",
		},
		{
			id: 2,
			role: "user",
			content: "I need help creating my first block.",
		},
		{
			id: 3,
			role: "system",
			content: "Sure! Just type /craft to get started.",
		},
		{
			id: 4,
			role: "user",
			content: "Awesome, thanks for the tip!",
		},
	])

	const suggestions = ["Craft a new block", "Refine an existing block"]

	const [inputValue, setInputValue] = useState("")

	const handleSend = async () => {
		if (!inputValue.trim()) return
		const newMessage: Message = {
			id: Date.now(),
			role: "user",
			content: inputValue.trim(),
		}
		setMessages((prev) => [...prev, newMessage])
		setInputValue("")

		const refactoredProject = await refactorProject({
			id: "id",
			message: newMessage.content,
		})

		console.log(refactoredProject)

		dispatch(projectUpdated(refactoredProject))
	}

	return (
		<div className="flex flex-col font-body h-full">
			{/* Main chat container */}
			<div className="h-full flex flex-col bg-surface1 p-4 rounded shadow-md text-white">
				{/* Message list (scrollable) */}
				<div className="grow overflow-y-auto space-y-4">
					{messages.map((msg, index) => {
						const isUser = msg.role === "user"
						return (
							<div key={msg.id} className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
								{/* System: avatar left, bubble right | User: bubble left, avatar right */}
								{isUser ? (
									<div className="flex items-start space-x-2">
										<img className="w-8 h-8 rounded-full" src="https://via.placeholder.com/32?text=U" alt="User Avatar" />
										<motion.div
											variants={bubbleVariants}
											initial="initial"
											animate="animate"
											transition={{ duration: 0.3, delay: index * 0.05 }}
											className="max-w-xs px-3 py-2 rounded bg-clickable text-surface1"
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
											className="max-w-xs px-3 py-2 rounded bg-surface3 text-white"
										>
											{msg.content}
										</motion.div>
										<img className="w-8 h-8 rounded-full" src="https://via.placeholder.com/32?text=S" alt="System Avatar" />
									</div>
								)}
							</div>
						)
					})}
				</div>

				{/* Suggestion buttons */}
				{messages.length <= 4 && (
					<div className="flex flex-wrap gap-2 justify-center my-4">
						{suggestions.map((text, index) => (
							<motion.button
								key={text}
								variants={bubbleVariants}
								initial="initial"
								animate="animate"
								transition={{ duration: 0.3, delay: index * 0.1 }}
								onClick={() => {
									setInputValue(text)
									handleSend()
								}}
								className="rounded-full px-3 py-1 bg-surface3 text-clickable text-sm
                             hover:bg-hover transition-colors"
							>
								{text}
							</motion.button>
						))}
					</div>
				)}

				{/* Message input + send button */}
				<div className="flex items-center space-x-2 mt-auto pt-4 pb-2">
					<input
						type="text"
						placeholder="Type your message..."
						className="flex-1 border border-disabled bg-surface1 rounded-full 
                       px-3 py-2 text-sm placeholder-base
                       focus:outline-none focus:ring-2 focus:ring-hover"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleSend()}
					/>
					<button
						onClick={handleSend}
						className="bg-clickable text-surface1 px-4 py-2 rounded-full 
                       text-sm hover:bg-hover transition-colors flex items-center justify-center"
						aria-label="Send"
					>
						<PlainIcon />
					</button>
				</div>
			</div>
		</div>
	)
}
