import React from "react"
import Chat from "../../components/chat"
import { useProject } from "../../util/store"
import { Tabs, Tab } from "@jigjoy-io/ui"
import ReloadIcon from "../../icons/reload-icon"

export default function Editor() {
	const project = useProject()

	return (
		<>
			{project && (
				<div className="grow flex flex-row p-8 bg-surface-3 gap-8">
					<div className="w-[33%] h-full">
						<Tabs>
							<Tab key="Chat">
								<Chat />
							</Tab>
							<Tab key="Source Code">
								<div className="h-full flex flex-col"></div>
							</Tab>
						</Tabs>
					</div>
					<div className="max-h-[100%] flex flex-col h-full w-full border border-black">
						<div className="h-[40px] flex flew-row bg-surface-1">
							<ReloadIcon color="ml-4 text-base" />
							<div className="m-2 rounded-full bg-surface-2 w-full px-4 text-base">/</div>
						</div>
						<iframe src="https://jigjoy.io/" className="grow" />
					</div>
				</div>
			)}
		</>
	)
}
