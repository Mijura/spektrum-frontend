import React, { useState, useRef } from "react"
import ReactDOM from "react-dom"
import { motion, AnimatePresence } from "framer-motion"

interface QuestsWidgetProps {
	portalTarget: HTMLElement
}

const initialQuests = [
	{
		id: 1,
		title: "Earn 50 XP",
		icon: "⚡",
		progress: 15,
		goal: 50,
		reward: "Chest #1",
	},
	{
		id: 2,
		title: "Spend 15 minutes learning",
		icon: "⏱️",
		progress: 3,
		goal: 15,
		reward: "Chest #2",
	},
	{
		id: 3,
		title: "Score 80% or higher in 6 lessons",
		icon: "🎯",
		progress: 1,
		goal: 6,
		reward: "Chest #3",
	},
]

const QuestsWidget: React.FC<QuestsWidgetProps> = ({ portalTarget }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [quests, setQuests] = useState(initialQuests)
	const buttonRef = useRef<HTMLButtonElement>(null)

	const handleClaimReward = (id: number) => {
		setQuests((prev) => prev.map((q) => (q.id === id ? { ...q, progress: 0 } : q)))
	}

	const getPopupPosition = () => {
		if (!buttonRef.current) return { top: 0, left: 0 }

		const rect = buttonRef.current.getBoundingClientRect()
		return {
			top: rect.bottom + 8,
			right: window.innerWidth - rect.right,
		}
	}

	const position = getPopupPosition()

	return (
		<div className="inline-block">
			<button ref={buttonRef} onClick={() => setIsOpen((prev) => !prev)} className="px-4 py-2 bg-surface2 text-[#90e86f] rounded hover:bg-surface3 transition-colors">
				Quests
			</button>

			{typeof document !== "undefined" &&
				ReactDOM.createPortal(
					<AnimatePresence>
						{isOpen && (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								transition={{ duration: 0.2 }}
								className="fixed bg-surface1 w-80 p-6 rounded-lg shadow-lg border border-disabled z-50"
								style={{
									top: position.top,
									right: position.right,
								}}
							>
								<h2 className="text-xl font-bold mb-6 text-[#90e86f]">Daily Quests</h2>
								<div className="space-y-4">
									{quests.map((quest) => {
										const isComplete = quest.progress >= quest.goal
										const progressPercent = Math.min((quest.progress / quest.goal) * 100, 100)

										return (
											<motion.div key={quest.id} className="p-4 bg-surface2 rounded-lg border border-disabled hover:border-[#E5FD78] transition-colors" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
												<div className="flex items-center justify-between mb-3">
													<span className="text-2xl mr-2">{quest.icon}</span>
													<span className="flex-1 text-base text-clickable font-medium group-hover:text-[#E5FD78]">{quest.title}</span>
												</div>

												<div className="w-full bg-disabled h-2 rounded-full overflow-hidden mb-2">
													<motion.div className="bg-[#90e86f] h-2" initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 0.5 }} />
												</div>

												<div className="flex justify-between items-center">
													<span className="text-sm text-base">
														{quest.progress}/{quest.goal}
													</span>
													<motion.button disabled={!isComplete} onClick={() => handleClaimReward(quest.id)} whileHover={isComplete ? { scale: 1.05 } : {}} whileTap={isComplete ? { scale: 0.95 } : {}} className={`${isComplete ? "bg-[#90e86f] hover:bg-[#E5FD78] text-surface1" : "bg-disabled text-base cursor-not-allowed"} px-4 py-1 rounded-md text-sm font-semibold transition-colors`}>
														{isComplete ? `Claim ${quest.reward}` : quest.reward}
													</motion.button>
												</div>
											</motion.div>
										)
									})}
								</div>
							</motion.div>
						)}
					</AnimatePresence>,
					portalTarget,
				)}
		</div>
	)
}

export default QuestsWidget
