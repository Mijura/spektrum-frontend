import { motion } from "framer-motion"
import { ProgressBar } from "@honeycomb-app/design"
import HoneycombActivityChart from "../components/honeycomb-chart"

export default function ProfilePage() {
	const user = {
		profileImage: "https://avatars.githubusercontent.com/u/110939072?v=4",
		nickname: "Lotus",
		dateJoined: "Joined on January 1, 2022",
		tokens: 4,
		level: 5,
		progressToNextLevel: 40, // as a percentage
	}

	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className={`w-full bg-primary p-6 flex flex-col items-center pt-20`}
			>
				{/* Top Section: Profile Info + Credits */}
				<div className="w-full max-w-[1275px] flex flex-col md:flex-row justify-between items-start md:items-center mb-4 rounded-sm shadow p-6 border border-primary-200">
					{/* Left: Profile Image & Basic Info */}
					<div className="flex items-center mb-4 md:mb-0">
						<img
							src={user.profileImage}
							alt="Profile"
							className="w-20 h-20 rounded-full mr-4 object-cover border-2 border-secondary-200"
						/>
						<div className="flex flex-col">
							<span className="text-xl font-semibold text-secondary-100">{user.nickname}</span>
							<span className="text-secondary-100">{user.dateJoined}</span>
							{/* Level and XP */}
							<div className="flex items-center gap-2 mt-1">
								<span className="text-sm text-secondary-100">Level {user.level}</span>
								<span className="text-sm text-secondary-100">•</span>
								<span className="text-sm text-secondary-100">{user.progressToNextLevel * 10} / 1000 XP</span>
							</div>

							<ProgressBar progress={40} />
						</div>
					</div>

					{/* Right: Token Widget */}
					<div className="flex flex-col items-center md:items-end">
						<span className="text-lg text-secondary-100">Tokens</span>
						<motion.span
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 200 }}
							className="text-2xl font-bold text-highlight"
						>
							{user.tokens}
						</motion.span>
					</div>
				</div>
				{/* Activity Graph */}
				<div className="w-full max-w-[1275px] p-2 h-fit my-6 border border-primary-200 rounded-sm pb-5">
					{/* <ActivityGraph data={activityData} /> */}
					<HoneycombActivityChart />
				</div>
			</motion.div>
		</>
	)
}
