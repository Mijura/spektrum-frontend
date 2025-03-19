import { motion } from "framer-motion"
import ActivityGraph from "../components/activity-graph"
import { useMemo } from "react"

export default function ProfilePage() {
	// Generate simulated activity data for the last 365 days
	const activityData = useMemo(() => {
		const data: { date: string; count: number }[] = []
		const end = new Date()
		const start = new Date(end)
		start.setDate(start.getDate() - 400) // Go back 364 days to make it 365 total

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
		credits: 4,
		level: 5,
		progressToNextLevel: 40, // as a percentage
	}

	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className={`w-full bg-surface-100 p-6 flex flex-col items-center pt-20`}
			>
				{/* Top Section: Profile Info + Credits */}
				<div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-start md:items-center mb-4 rounded-sm shadow p-6 border border-surface-300">
					{/* Left: Profile Image & Basic Info */}
					<div className="flex items-center mb-4 md:mb-0">
						<img
							src={user.profileImage}
							alt="Profile"
							className="w-20 h-20 rounded-full mr-4 object-cover border-2 border-base"
						/>
						<div className="flex flex-col">
							<span className="text-xl font-semibold text-base">{user.nickname}</span>
							<span className="text-base">{user.dateJoined}</span>
							{/* Level and XP */}
							<div className="flex items-center gap-2 mt-1">
								<span className="text-sm text-base">Level {user.level}</span>
								<span className="text-sm text-base">•</span>
								<span className="text-sm text-base">{user.progressToNextLevel * 10} / 1000 XP</span>
							</div>
							{/* Progress Bar  */}
							<div className="flex items-center mt-2">
								<div className="w-40 bg-disabled h-1 rounded-[3px] mr-2 relative">
									<motion.div
										className="bg-progress/75 h-1 rounded-[3px]"
										style={{
											width: `${user.progressToNextLevel}%`,
										}}
										initial={{ width: 0 }}
										animate={{ width: `${user.progressToNextLevel}%` }}
										transition={{ duration: 0.8 }}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Right: Credits Widget */}
					<div className="flex flex-col items-center md:items-end">
						<span className="text-lg text-base">Tokens</span>
						<motion.span
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 200 }}
							className="text-2xl font-bold text-wax"
						>
							{user.credits}
						</motion.span>
					</div>
				</div>
				{/* Activity Graph */}
				<div className="w-full max-w-4xl my-6 border border-surface-300 rounded-sm">
					<ActivityGraph data={activityData} />
				</div>
			</motion.div>
		</>
	)
}
