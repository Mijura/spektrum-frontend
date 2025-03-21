import { Tabs, Tab, Button, Tooltip } from "@honeycomb-app/design"
import { v4 as uuidv4 } from "uuid"
import ActivityRewards from "../components/activity-rewards"
import ReloadIcon from "../shared/icons/reload-icon"
import React, { useEffect } from "react"
import { useProject } from "../hooks/use-project"
import { deploy } from "../api/project"
import MoreOptionsIcon from "../shared/icons/more-options-icon"
import PlayIcon from "../shared/icons/play-icon"
import PlusIcon from "../shared/icons/plus-icon"
import TimelineIcon from "../shared/icons/timeline-icon"

export const PROJECT_MANAGEMENT_API = process.env.REACT_APP_PROJECT_MANAGEMENT_API

export default function WorkspacePage(props: any) {
	const project = useProject()
	const [iframeKey, setIframeKey] = React.useState(uuidv4())

	const reloadPage = () => {
		setIframeKey(uuidv4())
	}

	useEffect(() => {
		reloadPage()
	}, [project.sourceCode])

	const handleDeploy = async () => {
		const project = await deploy(props.id)
		console.log(project)
	}

	return (
		project && (
			<div key={props.id} className="grow flex flex-row p-2 pl-4 gap-3">
				<div className="w-[450px] flex flex-col h-full overflow-y-hidden rounded-[2px]">
					<ActivityRewards />
					<div className="flex flex-col bg-surface-100 mt-3 p-4 shadow-md h-full">
						<div className="flex flex-row gap-3 w-full bg-surface-100 mt-2 text-base text-sm mb-4">
							Development Activities
						</div>

						<div className="flex flex-row gap-3 items-center">
							<TimelineIcon />
							<div className="text-disabled">Executed tickets on Mar 17, 2025</div>
						</div>
						<div className="mt-2 flex flex-col items-center">
							<div className="flex flex-row w-full ml-3">
								<div className="border-l-2 border-disabled"></div>
								<div className="ml-2 h-[50px] grow items-center flex w-full ">
									<div className="p-2 h-[40px] rounded-sm w-full"></div>
								</div>
							</div>
							<div className="flex flex-row w-full ml-3">
								<div className="border-l-2 border-disabled"></div>
								<div className="ml-2 h-[50px] grow items-center flex w-full ">
									<div className="p-2 h-[40px] rounded-sm w-full"></div>
								</div>
							</div>
						</div>

						<div className="flex flex-row gap-3 mt-2 items-center">
							<TimelineIcon />
							<div className="text-disabled">Executed tickets on Mar 16, 2025</div>
						</div>
						<div className="mt-2 flex flex-col items-center">
							<div className="flex flex-row w-full ml-3">
								<div className="border-l-2 border-disabled"></div>
								<div className="ml-2 h-[50px] grow items-center flex w-full ">
									<div className="p-2 h-[40px] rounded-sm w-full"></div>
								</div>
							</div>
							<div className="flex flex-row w-full ml-3">
								<div className="border-l-2 border-disabled"></div>
								<div className="ml-2 h-[50px] grow items-center flex w-full ">
									<div className="p-2 h-[40px] rounded-sm w-full"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-row w-full">
					<Tabs>
						<Tab key="Planning">
							<div className="ml-4 mt-8 px-4 w-[300px]">
								<div className="flex flex-row w-full h-fit mb-2">
									<h1 className="ml-2 text-base text-sm w-fit flex items-center">Tickets</h1>

									<div className="flex justify-end grow">
										<Tooltip message="Create new ticket">
											<PlusIcon />
										</Tooltip>
									</div>
								</div>
								<div className="border-b border-disabled w-full"></div>
								<div className="w-full bg-surface-200 p-4 rounded-lg border border-disabled my-4 cursor-pointer hover:opacity-90">
									<div className="flex flex-row text-clickable">Implement a login page</div>
									<div className="mt-2 flex flex-row gap-2 w-full">
										<Tooltip message="Change status">
											<MoreOptionsIcon />
										</Tooltip>

										<div className="flex grow w-full justify-end">
											<Tooltip message="Run execution">
												<PlayIcon />
											</Tooltip>
										</div>
									</div>
								</div>
								<div className="w-full bg-surface-200 p-4 rounded-lg border border-disabled my-4 cursor-pointer hover:opacity-90">
									<div className="flex flex-row text-clickable">Implement a register page</div>
									<div className="mt-2 flex flex-row gap-2 w-full">
										<Tooltip message="Change status">
											<MoreOptionsIcon />
										</Tooltip>

										<div className="flex grow w-full justify-end">
											<Tooltip message="Run execution">
												<PlayIcon />
											</Tooltip>
										</div>
									</div>
								</div>
							</div>
						</Tab>
						<Tab key="Preview" className="flex flex-col h-full">
							<div className="flex flex-col h-full">
								<div className="h-[40px] flex flew-row bg-surface-100 rounded-tr-lg">
									<Tooltip message="Reload page">
										<div onClick={reloadPage}>
											<ReloadIcon color="ml-4 h-[40px] items-center text-clickable hover:text-base cursor-pointer" />
										</div>
									</Tooltip>
									<div className="m-2 rounded-full bg-surface-200 w-full px-4 text-base">/</div>
								</div>
								<div className="flex h-full">
									<iframe key={iframeKey} src={`${PROJECT_MANAGEMENT_API}/${project.id}`} className="grow" />
								</div>
							</div>
						</Tab>
						<Tab key="Production">
							<Button className="h-fit m-4 w-fit bg-primary hover:bg-hover-primary" onClick={handleDeploy}>
								Deploy to Production
							</Button>
						</Tab>
					</Tabs>
				</div>
			</div>
		)
	)
}
