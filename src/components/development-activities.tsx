import React, { useEffect } from "react"
import TimelineIcon from "../shared/icons/timeline-icon"
import { useTimeline } from "@honeycomb-app/jigjoy-react-sdk"

const DevelopmentActivities: React.FC = () => {
	const { timelineData } = useTimeline({ gameId: "honeycomb" })

	useEffect(() => {
		console.log(`timelineData`, timelineData)
	}, [timelineData])

	return (
		<div className="flex flex-col bg-primary mt-3 p-4 shadow-md h-full">
			<div className="flex flex-row gap-3 w-full bg-primary mt-2 text-highlight text-sm mb-4">Workflow Executions</div>

			<div className="flex flex-row gap-3 items-center">
				<TimelineIcon />
				<div className="text-secondary-200">Executed on Mar 17, 2025</div>
			</div>
			<div className="mt-2 flex flex-col items-center">
				<div className="flex flex-row w-full ml-3">
					<div className="border-l-2 border-secondary-200"></div>
					<div className="ml-2 h-[50px] grow items-center flex w-full ">
						<div className="p-2 h-[40px] rounded-sm w-full"></div>
					</div>
				</div>
				<div className="flex flex-row w-full ml-3">
					<div className="border-l-2 border-secondary-200"></div>
					<div className="ml-2 h-[50px] grow items-center flex w-full ">
						<div className="p-2 h-[40px] rounded-sm w-full"></div>
					</div>
				</div>
			</div>

			<div className="flex flex-row gap-3 mt-2 items-center">
				<TimelineIcon />
				<div className="text-secondary-200">Executed on Mar 16, 2025</div>
			</div>
			<div className="mt-2 flex flex-col items-center">
				<div className="flex flex-row w-full ml-3">
					<div className="border-l-2 border-secondary-200"></div>
					<div className="ml-2 h-[50px] grow items-center flex w-full ">
						<div className="p-2 h-[40px] rounded-sm w-full"></div>
					</div>
				</div>
				<div className="flex flex-row w-full ml-3">
					<div className="border-l-2 border-secondary-200"></div>
					<div className="ml-2 h-[50px] grow items-center flex w-full ">
						<div className="p-2 h-[40px] rounded-sm w-full"></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DevelopmentActivities
