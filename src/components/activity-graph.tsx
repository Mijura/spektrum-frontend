import React from "react"
import { motion } from "framer-motion"
import * as d3 from "d3-hexbin"

interface ContributionDay {
	date: string
	count: number
}

interface ActivityGraphProps {
	data: ContributionDay[]
}

const ActivityGraph: React.FC<ActivityGraphProps> = ({ data }) => {
	// Calculate the maximum contribution count to normalize the colors
	const maxCount = Math.max(...data.map((day) => day.count))

	// Function to determine the color intensity based on contribution count
	const getColor = (count: number) => {
		if (count === 0) return "bg-surface-200"
		const intensity = Math.ceil((count / maxCount) * 4)
		switch (intensity) {
			case 1:
				return "25"
			case 2:
				return "50"
			case 3:
				return "75"
			case 4:
				return "100"
			default:
				return "0"
		}
	}

	// Group data by weeks for display
	const weeks: ContributionDay[][] = []
	let currentWeek: ContributionDay[] = []

	data.forEach((day, index) => {
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
		<div className="w-full p-6">
			<h3 className="text-xl text-base mb-2">Development Activity</h3>
			<div className="w-full overflow-x-auto p-2">
				<div className="flex min-w-fit justify-start">
					{weeks.map((week, weekIndex) => (
						<div key={weekIndex} className="flex flex-col">
							{week.map((day, dayIndex) => (
								<motion.div
									key={day.date}
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: (weekIndex * 7 + dayIndex) * 0.01 }}
									className={`hexagon hover:ring-1 hover:ring-hover cursor-pointer transition-all duration-200 
          ${weekIndex % 2 === 1 ? "rotate-90 translate-y-[50%] -translate-x-[30%]" : ""}`} // Apply rotation and Y translation if the weekIndex is even
									data-opacity={getColor(day.count)}
									title={`${day.count} blocks on ${new Date(day.date).toLocaleDateString()}`}
								/>
							))}
						</div>
					))}
				</div>
			</div>
			<div className="flex items-center gap-2 mt-4 text-sm text-base">
				<span>Less</span>
				<div className="flex gap-[3px]">
					<div className="hexagon" data-opacity="0" />
					<div className="hexagon" data-opacity="25" />
					<div className="hexagon" data-opacity="50" />
					<div className="hexagon" data-opacity="75" />
					<div className="hexagon" data-opacity="100" />
				</div>
				<span>More</span>
			</div>
		</div>
	)
}

export default ActivityGraph
