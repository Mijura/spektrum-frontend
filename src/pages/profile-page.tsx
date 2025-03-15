import { motion } from "framer-motion"

export default function ProfilePage() {
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
				className={`w-full bg-surface-1 p-6 flex flex-col items-center`}
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
							<span className="text-xl font-semibold text-base">{user.nickname}</span>
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
			</motion.div>
		</>
	)
}
