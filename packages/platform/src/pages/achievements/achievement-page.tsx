import React from "react"
import { motion } from "framer-motion"

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

const ProgressBar = ({ progress }) => {
	return (
		<div className="w-full bg-surface3 h-2 rounded-full overflow-hidden">
			<motion.div className="bg-clickable h-2" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
		</div>
	)
}

const AchievementsPage = ({ onSelectAchievement }) => {
	return (
		<div className="min-h-screen py-10 px-8 text-white">
			<h1 className="text-2xl font-bold mb-6 text-clickable">My Achievements</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{achievementsData.map((achievement) => {
					const isLocked = achievement.status === "locked"
					const isCompleted = achievement.status === "completed"
					const isInProgress = achievement.status === "in-progress"

					return (
						<motion.div
							key={achievement.id}
							whileHover={{
								scale: 1.05,
								boxShadow: "0 0 20px rgba(229, 253, 120, 0.3)",
							}}
							transition={{
								type: "spring",
								stiffness: 400,
								damping: 17,
							}}
							onClick={() => onSelectAchievement(achievement)}
							className={`
                                w-full p-6 rounded-lg shadow-lg text-center cursor-pointer
                                ${isLocked ? "bg-surface2 opacity-50" : "bg-surface2 hover:bg-surface3"} 
                                flex flex-col items-center justify-center
                                transition-colors duration-200
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
									<ProgressBar progress={achievement.progress} />
								</div>
							)}

							{isLocked && (
								<div className="mt-2 text-sm text-disabled">
									<svg className="w-5 h-5 mb-1 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									Locked
								</div>
							)}
						</motion.div>
					)
				})}
			</div>
		</div>
	)
}

export default AchievementsPage
