import React from "react"
import Chat from "../../components/chat"
import { useProject } from "../../util/store"
import { Tabs, Tab } from "@jigjoy-io/ui"
import ReloadIcon from "../../icons/reload-icon"

export const PROJECT_MANAGEMENT_API = process.env.REACT_APP_PROJECT_MANAGEMENT_API

export default function Editor() {
	const project = useProject()

	return (
		<>
			{project && (
				<div className="grow flex flex-row p-4 bg-surface-3 gap-4">
					<div className="w-[40%] h-full overflow-y-hidden rounded-lg">
						<Chat />
					</div>
					<div className="flex flex-col w-full">
						<Tabs className="h-full">
							<Tab key="Preview" className="flex flex-col h-full">
								<div className="h-[40px] flex flew-row bg-surface-1 rounded-tr-lg">
									<ReloadIcon color="ml-4 text-base" />
									<div className="m-2 rounded-full bg-surface-2 w-full px-4 text-base">/</div>
								</div>
								<div className="flex h-full">
									<iframe src={`${PROJECT_MANAGEMENT_API}/${project.projectId}`} className="grow" />
								</div>
							</Tab>
							<Tab key="Source Code">
								<div></div>
							</Tab>
						</Tabs>
					</div>
				</div>
			)}
		</>
	)
}
