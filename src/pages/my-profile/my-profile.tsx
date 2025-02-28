import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ActivityGraph from "../../components/activity-graph"

interface Achievement {
	id: number
	title: string
	description: string
	earnedDate: string
}

const achievements = [
	{ id: 1, title: "First Steps", description: "Completed your first challenge", earnedDate: "2024-01-15" },
	{ id: 2, title: "Growing Up", description: "Reached level 5", earnedDate: "2024-02-20" },
	{ id: 3, title: "Social Star", description: "Gained 100 followers", earnedDate: "2024-03-01" },
]

const MyProfile = () => {
	const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

	// Generate simulated activity data for the last 365 days
	const activityData = useMemo(() => {
		const data: { date: string; count: number }[] = []
		const end = new Date()
		const start = new Date(end)
		start.setDate(start.getDate() - 445) // Go back 364 days to make it 365 total

		for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
			// Generate random activity count with higher probability of lower numbers
			// and occasional spikes
			const rand = Math.random()
			let count = 0
			if (rand > 0.3) {
				// 70% chance of activity
				if (rand > 0.9) {
					// 10% chance of high activity
					count = Math.floor(Math.random() * 15) + 10 // 10-25 blocks
				} else {
					count = Math.floor(Math.random() * 8) + 1 // 1-8 blocks
				}
			}

			data.push({
				date: d.toISOString().split("T")[0],
				count,
			})
		}
		return data
	}, [])
	const user = {
		profileImage: "https://avatars.githubusercontent.com/u/110939072?v=4",
		nickname: "Lotus",
		dateJoined: "Joined on January 1, 2022",
		credits: 120,
		level: 5,
		progressToNextLevel: 60, // as a percentage
	}

	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className={`w-full bg-surface-1 p-6 flex flex-col items-center ${selectedAchievement ? "blur-sm" : ""}`}
			>
				{/* Top Section: Profile Info + Credits */}
				<div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-start md:items-center mb-4 bg-surface-2 rounded-md shadow p-4 border border-disabled">
					{/* Left: Profile Image & Basic Info */}
					<div className="flex items-center mb-4 md:mb-0">
						<img
							src={user.profileImage}
							alt="Profile"
							className="w-20 h-20 rounded-full mr-4 object-cover border-2 border-base"
						/>
						<div className="flex flex-col">
							<span className="text-xl font-semibold text-heading">{user.nickname}</span>
							<span className="text-base">{user.dateJoined}</span>
							{/* Level and XP */}
							<div className="flex items-center gap-2 mt-1">
								<span className="text-sm text-base">Level {user.level}</span>
								<span className="text-sm text-base">•</span>
								<span className="text-sm text-base">{user.progressToNextLevel * 10} / 1000 XP</span>
							</div>
							{/* Progress Bar + Chest */}
							<div className="flex items-center mt-2">
								<div className="w-40 bg-disabled h-2 rounded-[3px] mr-2 relative">
									<motion.div
										className="bg-primary h-2 rounded-[3px]"
										style={{
											width: `${user.progressToNextLevel}%`,
										}}
										initial={{ width: 0 }}
										animate={{ width: `${user.progressToNextLevel}%` }}
										transition={{ duration: 0.8 }}
									/>
								</div>{" "}
								&nbsp;&nbsp;&nbsp;
								<motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="cursor-pointer">
									<img
										src="https://jigjoy-dev.s3.eu-west-1.amazonaws.com/chest_nobg.png"
										alt="Reward Chest"
										className="w-10 h-10"
									/>
								</motion.div>
							</div>
						</div>
					</div>

					{/* Right: Credits Widget */}
					<div className="flex flex-col items-center md:items-end">
						<span className="text-lg font-semibold text-base">Credits</span>
						<motion.span
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 200 }}
							className="text-2xl font-bold text-primary"
						>
							{user.credits}
						</motion.span>
					</div>
				</div>

				{/* Activity Graph */}
				{/* <div className="w-full max-w-4xl mb-4">
					<ActivityGraph data={activityData} />
				</div> */}

				{/* Achievements Section */}
				{/* <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{achievements.map((achievement) => (
						<motion.div
							key={achievement.id}
							className="bg-surface-2 rounded-md shadow p-4 flex flex-col items-start border border-disabled hover:border-hover cursor-pointer"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4 }}
							onClick={() => setSelectedAchievement(achievement)}
							whileHover={{ scale: 1.02 }}
						>
							<div className="h-16 w-16 bg-surface-1 rounded-md mb-3 flex items-center justify-center border border-disabled">
								<span className="text-heading text-xl font-bold">{achievement.id}</span>
							</div>
							<h3 className="text-lg font-semibold text-heading mb-1">{achievement.title}</h3>
							<p className="text-base">{achievement.description}</p>
						</motion.div>
					))}
				</div> */}
			</motion.div>

			{/* Achievement Modal */}
			<AnimatePresence>
				{selectedAchievement && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 flex items-center justify-center z-50"
						onClick={() => setSelectedAchievement(null)}
					>
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							className="bg-surface-2 p-8 rounded-lg shadow-xl border border-hover max-w-md w-full mx-4"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="flex items-center justify-between mb-6">
								<div className="h-20 w-20 bg-surface-1 rounded-md flex items-center justify-center border border-disabled">
									<span className="text-accent text-3xl font-bold">{selectedAchievement.id}</span>
								</div>
								<button onClick={() => setSelectedAchievement(null)} className="text-base hover:text-hover">
									✕
								</button>
							</div>
							<h2 className="text-2xl font-bold text-heading mb-4">{selectedAchievement.title}</h2>
							<p className="text-base mb-6">{selectedAchievement.description}</p>
							<div className="text-sm text-base">
								Earned on{" "}
								{new Date(selectedAchievement.earnedDate).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

export default MyProfile
