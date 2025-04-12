import { motion } from "framer-motion"
import { ProgressBar } from "@honeycomb-app/design"
import HoneycombActivityChart from "../components/honeycomb-chart"
import { useProfile } from "../hooks/use-profile"

export default function ProfilePage() {
	const profile = useProfile()

	return (
		profile && (
			<>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className={`w-full bg-[#1a1a1a]  pt-16 px-6 flex flex-col items-center`}
				>
					{/* Top Section: Profile Info + Credits */}
					<div className="w-full p-8 max-w-[1275px] flex flex-col md:flex-row justify-between items-start md:items-center mb-4 rounded-md shadow py-6">
						{/* Left: Profile Image & Basic Info */}

						<div className="flex items-center h-fit">
							<img
								src={profile.image}
								alt="Profile"
								className="w-20 h-20 mr-4 rounded-full object-cover border-2 border-secondary-200"
							/>
							<div className="flex flex-col h-fit">
								<motion.h1
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}
									className="items-start w-full text-highlight-100"
								>
									{profile.email}
								</motion.h1>
								{/* Level and XP */}
								<div className="flex items-center gap-2 mt-1">
									<span className="text-sm text-secondary-100">Level {profile.level}</span>
									<span className="text-sm text-secondary-100">•</span>
									<span className="text-sm text-secondary-100">{profile.progressToNextLevel * 10} / 1000 XP</span>
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
								className="text-4xl font-bold text-highlight"
							>
								{profile.tokens}
							</motion.span>
						</div>
					</div>
					{/* Activity Graph */}
					<div className="w-full bg-surface max-w-[1275px] px-2 h-fit border border-primary-200 rounded-sm">
						{/* <ActivityGraph data={activityData} /> */}
						<HoneycombActivityChart />
					</div>
				</motion.div>
			</>
		)
	)
}
