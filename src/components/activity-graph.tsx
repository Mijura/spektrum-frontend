import React, { useMemo } from "react"
import { motion } from "framer-motion"

interface ContributionDay {
	date: string
	count: number
}

interface ActivityGraphProps {
	data: ContributionDay[]
}

const ActivityGraph: React.FC<ActivityGraphProps> = () => {
	// Generate simulated activity data for the last 365 days
	const activityData = useMemo(() => {
		const data: { date: string; count: number }[] = []
		const end = new Date()
		const start = new Date(end)
		start.setDate(start.getDate() - 365) // Go back 364 days to make it 365 total

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

	// Calculate the maximum contribution count to normalize the colors
	const maxCount = Math.max(...activityData.map((day) => day.count))

	// Function to determine the color intensity based on contribution count
	const getColor = (count: number) => {
		if (count === 0) return "bg-primary-100"
		const intensity = Math.ceil((count / maxCount) * 4)
		switch (intensity) {
			case 1:
				return "bg-primary/25"
			case 2:
				return "bg-primary/50"
			case 3:
				return "bg-primary/75"
			case 4:
				return "bg-primary"
			default:
				return "bg-primary-100"
		}
	}

	// Group data by weeks for display
	const weeks: ContributionDay[][] = []
	let currentWeek: ContributionDay[] = []

	activityData.forEach((day, index) => {
		currentWeek.push(day)
		if ((index + 1) % 7 === 0) {
			weeks.push(currentWeek)
			currentWeek = []
		}
	})

	if (currentWeek.length > 0) {
		weeks.push(currentWeek)
	}

	return (
		<div className="w-full bg-primary-100 p-6 rounded-lg border border-disabled">
			<h3 className="text-xl font-semibold text-secondary mb-2">Workflow Executions</h3>
			<div className="w-full overflow-x-auto p-2">
				<div className="flex gap-[3px] min-w-fit justify-start">
					{weeks.map((week, weekIndex) => (
						<div key={weekIndex} className="flex flex-col gap-[3px]">
							{week.map((day, dayIndex) => (
								<motion.div
									key={day.date}
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: (weekIndex * 7 + dayIndex) * 0.01 }}
									className={`w-[10px] h-[10px] rounded-[2px] ${getColor(day.count)} hover:ring-1 hover:ring-hover cursor-pointer transition-all duration-200`}
									title={`${day.count} blocks on ${new Date(day.date).toLocaleDateString()}`}
								/>
							))}
						</div>
					))}
				</div>
			</div>
			<div className="flex items-center gap-2 mt-4 text-sm text-secondary">
				<span>Less</span>
				<div className="flex gap-[3px]">
					<div className="w-[10px] h-[10px] rounded-[2px] bg-primary-100" />
					<div className="w-[10px] h-[10px] rounded-[2px] bg-primary/25" />
					<div className="w-[10px] h-[10px] rounded-[2px] bg-primary/50" />
					<div className="w-[10px] h-[10px] rounded-[2px] bg-primary/75" />
					<div className="w-[10px] h-[10px] rounded-[2px] bg-primary" />
				</div>
				<span>More</span>
			</div>
		</div>
	)
}

export default ActivityGraph
