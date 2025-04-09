import { Tooltip } from "@honeycomb-app/design"
import React, { useEffect } from "react"
import ReloadIcon from "../shared/icons/reload-icon"
import { v4 as uuidv4 } from "uuid"
import { useProject } from "../hooks/use-project"

export const PROJECT_MANAGEMENT_ENDPOINT = process.env.PROJECT_MANAGEMENT_ENDPOINT

const AppPreview: React.FC = () => {
	const project = useProject()

	const [iframeKey, setIframeKey] = React.useState(uuidv4())

	const reloadPage = () => {
		setIframeKey(uuidv4())
	}

	useEffect(() => {
		reloadPage()
	}, [project.sourceCode])

	return (
		<div className="flex flex-col h-full">
			<div className="h-[40px] flex flew-row bg-surface rounded-tr-lg">
				<Tooltip message="Reload page">
					<div onClick={reloadPage}>
						<ReloadIcon color="ml-4 h-[40px] items-center text-secondary-100 hover:text-secondary cursor-pointer" />
					</div>
				</Tooltip>
				<div className="m-2 rounded-full bg-surface-muted w-full px-4 text-secondary">/</div>
			</div>
			<div className="flex h-full">
				<iframe key={iframeKey} src={`${PROJECT_MANAGEMENT_ENDPOINT}/${project.id}`} className="grow" />
			</div>
		</div>
	)
}

export default AppPreview
