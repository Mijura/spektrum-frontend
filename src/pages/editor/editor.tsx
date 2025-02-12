import {
	SandpackCodeEditor,
	SandpackFileExplorer,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider,
} from "@codesandbox/sandpack-react"
import React from "react"
import { sandpackDark } from "@codesandbox/sandpack-themes"
import Chat from "../../components/chat"
import { useProject } from "../../util/store"
import { Tabs, Tab } from "@jigjoy-io/ui"

export default function Editor() {
	const project = useProject()

	return (
		<>
			{project && (
				<div className="h-full flex flex-row pl-2 bg-surface-3">
					<div className="h-full w-full p-4">
						<SandpackProvider theme={sandpackDark} files={project.sourceCode} template="react-ts" style={{ height: "100%" }}>
							<SandpackLayout style={{ height: "100%" }}>
								<div className="flex flex-row w-full bg-surface-3">
									<div className="w-[33%] mr-[20px]">
										<Tabs>
											<Tab key="Chat">
												<div className="h-[100%] max-h-[88dvh] w-full">
													<Chat />
												</div>
											</Tab>
											<Tab key="Source Code">
												<div className="h-full flex flex-col">
													<SandpackFileExplorer autoHiddenFiles={true} style={{ height: "25%" }} />
													<SandpackCodeEditor showTabs={false} style={{ height: "75%" }} />
												</div>
											</Tab>
										</Tabs>
									</div>

									<div className="grow">
										<SandpackPreview
											showNavigator={true}
											showOpenInCodeSandbox={false}
											showRestartButton={true}
											style={{ height: "100%", overflowY: "auto" }}
										/>
									</div>
								</div>
							</SandpackLayout>
						</SandpackProvider>
					</div>
				</div>
			)}
		</>
	)
}
