import React, { useEffect, useState } from "react"
import Chat from "../../components/chat"
import { useProject } from "../../util/store"
import { Tabs, Tab } from "@jigjoy-io/ui"
import ReloadIcon from "../../icons/reload-icon"
import { v4 as uuidv4 } from "uuid"

export const STORAGE_URL = process.env.REACT_APP_FRONTEND_STORAGE

export default function Editor() {
	const [key, setKey] = useState(uuidv4())
	const project = useProject()

	useEffect(() => {
		setKey(uuidv4())
	}, [project])

	return (
		<>
			{project && (
				<div className="grow flex flex-row p-4 bg-surface-3 gap-4">
					<div className="w-[50%] h-full overflow-y-hidden">
						<Tabs>
							<Tab key="Chat">
								<Chat />
							</Tab>
							<Tab key="Source Code">
								<div className="flex flex-col"></div>
							</Tab>
						</Tabs>
					</div>
					<div className="flex flex-col w-full border border-black">
						<div className="h-[40px] flex flew-row bg-surface-1">
							<ReloadIcon color="ml-4 text-base" />
							<div className="m-2 rounded-full bg-surface-2 w-full px-4 text-base">/</div>
						</div>
						<iframe key={key} src={`${STORAGE_URL}/${project.id}`} className="grow" />
					</div>
				</div>
			)}
		</>
	)
}
