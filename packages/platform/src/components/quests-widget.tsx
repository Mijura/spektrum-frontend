import React, { useState, useRef, Suspense } from "react"
import { motion } from "framer-motion"
import QuestsIcon from "../icons/quests-icon"
const Popover = React.lazy(() => import("@jigjoy-ui/popover"))
const PopoverTrigger = React.lazy(() => import("@jigjoy-ui/popover-trigger"))
const PopoverContent = React.lazy(() => import("@jigjoy-ui/popover-content"))

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

const QuestsWidget: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [quests, setQuests] = useState(initialQuests)
	const buttonRef = useRef<HTMLDivElement>(null)
	const [hovered, SetHover] = useState(false)

	const handleClaimReward = (id: number) => {
		setQuests((prev) => prev.map((q) => (q.id === id ? { ...q, progress: 0 } : q)))
	}

	return (
		<div>
			<Suspense>
				<Popover position="bottom-end" onOpenCallback={() => setIsOpen(true)} onCloseCallback={() => setIsOpen(false)}>
					<PopoverTrigger>
						<div ref={buttonRef} className="cursor-pointer" onMouseEnter={() => SetHover(true)} onMouseLeave={() => SetHover(false)}>
							<QuestsIcon color={isOpen ? "text-accent" : hovered ? "text-hover" : "text-clickable"} />
						</div>
					</PopoverTrigger>
					<PopoverContent>
						<div className="p-4">
							<h2 className="text-xl font-bold mb-6">Daily Quests</h2>
							<div className="space-y-4">
								{quests.map((quest) => {
									const isComplete = quest.progress >= quest.goal
									const progressPercent = Math.min((quest.progress / quest.goal) * 100, 100)

									return (
										<motion.div key={quest.id} className="p-4 bg-surface2 rounded-lg border border-disabled hover:border-hover transition-colors" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
											<div className="flex items-center justify-between mb-3">
												<span className="text-2xl mr-2">{quest.icon}</span>
												<span className="flex-1 text-base text-clickable font-medium group-hover:text-hover">{quest.title}</span>
											</div>

											<div className="w-full bg-disabled h-2 rounded-full overflow-hidden mb-2">
												<motion.div className="bg-clickable h-2" initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 0.5 }} />
											</div>

											<div className="flex justify-between items-center">
												<span className="text-sm text-base">
													{quest.progress}/{quest.goal}
												</span>
												<motion.button disabled={!isComplete} onClick={() => handleClaimReward(quest.id)} whileHover={isComplete ? { scale: 1.05 } : {}} whileTap={isComplete ? { scale: 0.95 } : {}} className={`${isComplete ? "bg-clickable hover:bg-hover text-surface1" : "bg-disabled text-base cursor-not-allowed"} px-4 py-1 rounded-md text-sm font-semibold transition-colors`}>
													{isComplete ? `Claim ${quest.reward}` : quest.reward}
												</motion.button>
											</div>
										</motion.div>
									)
								})}
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</Suspense>
		</div>
	)
}

export default QuestsWidget
