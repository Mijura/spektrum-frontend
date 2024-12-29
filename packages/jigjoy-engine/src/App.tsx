import { SandpackCodeEditor, SandpackFileExplorer, SandpackLayout, SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react"
import { sandpackDark } from "@codesandbox/sandpack-themes"
import React, { useState } from "react"
import SimpleCodeViewer from "./components/simple-code-viewer"
import LeftSideMenu from "./components/left-side-menu"
import Header from "./components/header"
import Tabs, { Tab } from "../src/components/tabs/tabs"

export default function App() {
	const [editorOn, toggleEditor] = useState(false)

	const files = {
		"/App.tsx": `
export default function App() {
	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<h1 className="text-4xl font-bold text-pink-500">Welcome, to JigJoy Playground!</h1>
		</div>
	);
}
`,
	}

	return (
		<div className="flex flex-col h-[100dvh] bg-[#2F2F2F]">
			<LeftSideMenu />
			<Header />
			<div className="flex flex-row grow ml-[72px] pl-2">
				<div className="h-full w-full p-4">
					<SandpackProvider
						template="react-ts"
						theme={sandpackDark}
						files={files}
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
							<div className="flex flex-row w-full">
								<div className="w-[25%] bg-[#2F2F2F]">
									<Tabs>
										<Tab key="Create">
											<div>
												<h2 className="text-lg font-semibold">Create</h2>
												<p>This is the content displayed for the first tab.</p>
											</div>
										</Tab>
										<Tab key="Building Blocks">
											<div className="h-full flex pr-10">
												<SandpackFileExplorer autoHiddenFiles={true} style={{ height: "100%" }} />
												{editorOn && <SandpackCodeEditor style={{ height: "100%" }} />}
											</div>
										</Tab>
									</Tabs>
								</div>

								<div className="grow">
									<SandpackPreview
										showNavigator={true}
										showOpenInCodeSandbox={false}
										showRestartButton={true}
										style={{ height: "100%" }}
										actionsChildren={
											<div>
												<button className="bg-[black] text-[#90e86f] mx-1 p-2 rounded-lg" onClick={() => toggleEditor(!editorOn)}>
													Toggle Editor
												</button>
											</div>
										}
									/>
									<SimpleCodeViewer />
								</div>
							</div>
						</SandpackLayout>
					</SandpackProvider>
				</div>
			</div>
		</div>
	)
}
