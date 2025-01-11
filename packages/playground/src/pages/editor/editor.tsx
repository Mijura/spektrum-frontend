import {
	SandpackCodeEditor,
	SandpackFileExplorer,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider,
} from "@codesandbox/sandpack-react"
import React, { Suspense, useState } from "react"
import { sandpackDark } from "@codesandbox/sandpack-themes"
const Tabs = React.lazy(() => import("@jigjoy-ui/tabs"))
const Tab = React.lazy(() => import("@jigjoy-ui/tab"))
import Chat from "../../components/chat"
import { useProject } from "../../util/store"

export default function Editor() {
	const [editorOn, toggleEditor] = useState(false)

	const project = useProject()

	return (
		<>
			{project && (
				<div className="flex flex-row grow h-full pl-2 bg-surface3">
					<div className="h-full w-full p-4">
						<SandpackProvider
							template="react-ts"
							theme={sandpackDark}
							files={project.files}
							customSetup={{
								dependencies: {
									"framer-motion": "latest",
								},
							}}
							style={{ height: "100%" }}
							options={{
								externalResources: ["https://cdn.tailwindcss.com"],
							}}
						>
							<SandpackLayout style={{ height: "100%" }}>
								<div className="flex flex-row w-full bg-surface3">
									<div className="w-[33%] mr-[20px]">
										<Suspense>
											<Tabs>
												<Tab key="Discovery">
													<div className="h-full w-full pr-5 pb-10">
														<Chat />
													</div>
												</Tab>
												<Tab key="Source">
													<div className="h-full flex flex-col">
														<SandpackFileExplorer autoHiddenFiles={true} style={{ height: "25%" }} />
														<SandpackCodeEditor showTabs={false} style={{ height: "75%" }} />
													</div>
												</Tab>
											</Tabs>
										</Suspense>
									</div>

									<div className="grow">
										<SandpackPreview
											showNavigator={true}
											showOpenInCodeSandbox={false}
											showRestartButton={true}
											style={{ height: "100%" }}
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
