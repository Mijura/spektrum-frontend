import { Tabs, Tab, Button } from "@honeycomb-app/design"
import { v4 as uuidv4 } from "uuid"
import TokenRewards from "../components/token-rewards"
import ReloadIcon from "../shared/icons/reload-icon"
import React, { useEffect } from "react"
import { useProject } from "../hooks/use-project"
import { deploy } from "../api/project"
import Tooltip from "../shared/tooltip"

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
		<>
			{project && (
				<div key={props.id} className="grow flex flex-row p-2 pl-4 gap-3">
					<div className="w-[450px] flex flex-col h-full overflow-y-hidden rounded-[2px]">
						<TokenRewards />
						<div className="flex flex-col bg-surface-100 mt-3 p-4 shadow-md text-white h-full">
							<div className="flex flex-row gap-3 w-full bg-surface-100 mt-2 text-base text-sm mb-4">Development History</div>

							<div className="flex flex-row gap-3 items-center">
								<svg
									aria-hidden="true"
									focusable="false"
									viewBox="0 0 16 16"
									width="16"
									height="16"
									fill="currentColor"
									className="inline-block text-disabled"
								>
									<path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>
								</svg>
								<div className="text-disabled">Finished tickets on Mar 17, 2025</div>
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
								<svg
									aria-hidden="true"
									focusable="false"
									viewBox="0 0 16 16"
									width="16"
									height="16"
									fill="currentColor"
									className="inline-block text-disabled"
								>
									<path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>
								</svg>
								<div className="text-disabled">Finished tickets on Mar 16, 2025</div>
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
										<h1 className="ml-2 text-base text-sm w-fit flex items-center">Active Tickets</h1>

										<div className="flex justify-end grow">
											<Tooltip message="Create new ticket">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													width="8"
													height="8"
													strokeWidth={1.5}
													stroke="currentColor"
													className="size-6 cursor-pointer text-clickable hover:text-base"
												>
													<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
												</svg>
											</Tooltip>
										</div>
									</div>
									<div className="border-b border-disabled w-full"></div>
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
							<Tab key="Deployment">
								<Button className="h-fit m-4 w-fit bg-primary hover:bg-hover-primary" onClick={handleDeploy}>
									Deploy to Production
								</Button>
							</Tab>
						</Tabs>
					</div>
				</div>
			)}
		</>
	)
}
