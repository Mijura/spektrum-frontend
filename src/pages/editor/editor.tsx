import React from "react"
import Chat from "../../components/chat"
import { useProject } from "../../util/store"
import { Tabs, Tab } from "@jigjoy-io/ui"

export default function Editor() {
	const project = useProject()

	return (
		<>
			{project && (
				<div className="grow flex flex-row p-8 bg-surface-3">
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
				</div>
			)}
		</>
	)
}
