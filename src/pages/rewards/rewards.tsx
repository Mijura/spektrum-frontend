import React from "react"
import { motion } from "framer-motion"
import { Card, ProgressBar } from "@jigjoy-io/ui"

// --- Temporary test data for Daily Quests ---
const dailyQuestsData = [
	{
		id: 1,
		icon: "🌟",
		title: "Login Streak",
		description: "Log in 3 days in a row to earn a special bonus.",
		progress: 1,
		goal: 3,
		reward: "50 XP",
	},
	{
		id: 2,
		icon: "⭐",
		title: "Complete a Project",
		description: "Finish any project to claim your daily XP reward.",
		progress: 0,
		goal: 1,
		reward: "75 XP",
	},
	{
		id: 3,
		icon: "🔥",
		title: "Share a Project",
		description: "Share a project publicly at least once.",
		progress: 1,
		goal: 1,
		reward: "100 XP",
	},
	{
		id: 4,
		icon: "💖",
		title: "Collect 5 Likes",
		description: "Get 5 likes in total across your shared projects.",
		progress: 2,
		goal: 5,
		reward: "25 XP",
	},
]

// --- Existing Achievements data ---
const achievementsData = [
	{
		id: 1,
		name: "Novices Reward",
		icon: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/achievement.png",
		status: "completed",
		progress: 100,
		description: "Complete your first project using JigJoy.",
		earnedDate: "2024-01-15",
		preconditions: [],
	},
	{
		id: 2,
		name: "Channel3 Star",
		icon: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/achievement.png",
		status: "in-progress",
		progress: 50,
		description: "Create and share 3 different projects with the community.",
		earnedDate: null,
		preconditions: ["Complete your first project", "Share a project"],
	},
	{
		id: 3,
		name: "Contribute Star",
		icon: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/achievement.png",
		status: "completed",
		progress: 100,
		description: "Contribute to the JigJoy community by helping other users.",
		earnedDate: "2024-01-20",
		preconditions: [],
	},
	{
		id: 4,
		name: "Sharers",
		icon: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/achievement.png",
		status: "locked",
		progress: 0,
		description: "Share your projects with 10 different users.",
		earnedDate: null,
		preconditions: ["Complete 3 projects", "Get 5 likes on your projects"],
	},
	{
		id: 5,
		name: "Media Star",
		icon: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/achievement.png",
		status: "in-progress",
		progress: 75,
		description: "Create a project that includes all types of media elements.",
		earnedDate: null,
		preconditions: ["Create 5 projects"],
	},
	{
		id: 6,
		name: "Video Geek",
		icon: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/achievement.png",
		status: "locked",
		progress: 0,
		description: "Create a project with 5 or more video elements.",
		earnedDate: null,
		preconditions: ["Complete Media Star achievement", "Create 3 video projects"],
	},
	{
		id: 7,
		name: "Attitude Star",
		icon: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/achievement.png",
		status: "in-progress",
		progress: 25,
		description: "Receive 10 positive feedback ratings from other users.",
		earnedDate: null,
		preconditions: ["Share 5 projects"],
	},
]

const Rewards = ({ onSelectAchievement }) => {
	// Simulate a claim reward action (replace with real logic)
	const handleClaimReward = (questId) => {
		alert(`Reward for Quest #${questId} claimed!`)
	}

	return (
		<div className="flex items-center justify-center">
			<div className="min-h-screen py-10 px-8 text-white max-w-6xl w-full">
				{/* --- Daily Quests Section --- */}
				<h1 className="text-2xl font-bold mb-6 text-heading">Daily Quests</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
					{dailyQuestsData.map((quest) => {
						// Calculate progress percentage & completion
						const progressPercent = Math.round((quest.progress / quest.goal) * 100)
						const isComplete = quest.progress >= quest.goal

						return (
							<Card key={quest.id}>
								<div className="w-full flex flex-col gap-1">
									{/* Header with icon & title */}
									<div className="flex items-center gap-3 p-1">
										<span className="text-2xl">{quest.icon}</span>
										<span className="flex-1 text-base text-heading font-medium hover:text-hover">{quest.title}</span>
									</div>

									<div className="flex items-center gap-2 p-1 text-wrap min-h-[64px]">
										<span className="text-sm text-base">{quest.description}</span>
									</div>

									{/* Progress bar */}
									<div className="flex flex-col gap-3 p-1">
										<ProgressBar progressPercent={progressPercent} />
										{/* Progress stats & Claim button */}
										<div className="flex justify-between items-center p-2">
											<span className="text-sm text-base">
												{quest.progress}/{quest.goal}
											</span>

											<motion.button
												disabled={!isComplete}
												onClick={() => handleClaimReward(quest.id)}
												whileHover={isComplete ? { scale: 1.05 } : {}}
												whileTap={isComplete ? { scale: 0.95 } : {}}
												className={`
                                                ${isComplete ? "bg-clickable hover:bg-hover text-surface1" : "bg-disabled text-base cursor-not-allowed"}
                                                px-4 py-1 rounded-md text-sm font-semibold transition-colors
                                            `}
											>
												{isComplete ? `Claim ${quest.reward}` : quest.reward}
											</motion.button>
										</div>
									</div>
								</div>
							</Card>
						)
					})}
				</div>

				{/* --- Achievements Section --- */}
				<h1 className="text-2xl font-bold mb-6 text-heading">My Achievements</h1>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{achievementsData.map((achievement) => {
						const isLocked = achievement.status === "locked"
						const isCompleted = achievement.status === "completed"
						const isInProgress = achievement.status === "in-progress"

						return (
							<Card key={achievement.id}>
								<div
									className={`
					w-full text-center
					${isLocked ? "opacity-50" : ""} 
					flex flex-col items-center justify-center
				  `}
								>
									<motion.img
										src={achievement.icon}
										alt={`${achievement.name} icon`}
										className={`w-24 h-24 mb-4 ${isLocked ? "filter grayscale" : ""}`}
										whileHover={{
											rotate: [0, -10, 10, -10, 0],
											transition: {
												duration: 0.5,
												ease: "easeInOut",
											},
										}}
									/>
									<h2 className="text-lg font-semibold mb-3">{achievement.name}</h2>

									{isCompleted && (
										<div className="text-clickable font-bold flex items-center">
											<svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
											</svg>
											Completed
										</div>
									)}

									{isInProgress && (
										<div className="w-full">
											<p className="mb-2 text-sm text-clickable">Progress: {achievement.progress}%</p>
											<ProgressBar progressPercent={achievement.progress} />
										</div>
									)}

									{isLocked && (
										<div className="mt-2 text-sm text-disabled">
											<svg className="w-5 h-5 mb-1 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M12 15v2m0 0v2m0-2h2m-2 0H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											Locked
										</div>
									)}
								</div>
							</Card>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default Rewards
