import { Tabs, Tab, Button } from "@jigjoy-io/ui"
import { v4 as uuidv4 } from "uuid"
import Chat from "../components/chat"
import ReloadIcon from "../shared/icons/reload-icon"
import React, { useEffect } from "react"
import { useProject } from "../hooks/use-project"
import { deploy } from "../api/project"

export const PROJECT_MANAGEMENT_API = process.env.REACT_APP_PROJECT_MANAGEMENT_API

export default function EditorPage(props: any) {
	const project = useProject()
	const [iframeKey, setIframeKey] = React.useState(uuidv4())

	useEffect(() => {
		setIframeKey(uuidv4())
	}, [project.sourceCode])

	const handleDeploy = async () => {
		const project = await deploy(props.id)
		console.log(project)
	}

	return (
		<>
			{project && (
				<div key={props.id} className="grow flex flex-row p-4 bg-surface-3 gap-4">
					<div className="xl:w-[50%] 2xl:w-[33%] h-full overflow-y-hidden rounded-lg">
						<Chat />
					</div>
					<div className="flex flex-col w-full">
						<div className="flex items-end justify-end">
							<Button className="w-fit" onClick={handleDeploy}>
								Deploy
							</Button>
						</div>
						<Tabs className="h-full">
							<Tab key="Preview" className="flex flex-col h-full">
								<div className="h-[40px] flex flew-row bg-surface-1 rounded-tr-lg">
									<ReloadIcon color="ml-4 text-base" />
									<div className="m-2 rounded-full bg-surface-2 w-full px-4 text-base">/</div>
								</div>
								<div className="flex h-full">
									<iframe key={iframeKey} src={`${PROJECT_MANAGEMENT_API}/${project.id}`} className="grow" />
								</div>
							</Tab>
						</Tabs>
					</div>
				</div>
			)}
		</>
	)
}
