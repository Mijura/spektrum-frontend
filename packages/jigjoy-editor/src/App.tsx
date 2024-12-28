import { SandpackCodeEditor, SandpackFileExplorer, SandpackLayout, SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react"
import { sandpackDark } from "@codesandbox/sandpack-themes"
import React, { useState } from "react"
import SimpleCodeViewer from "./components/simple-code-viewer"
import LeftSideMenu from "./components/left-side-menu"
import Header from "./components/header"

export default function App() {
	const [editorOn, toggleEditor] = useState(false)
	const [blocksOn, toggleBlocks] = useState(false)

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
		<div className="flex flex-col h-[100dvh] bg-[#252525]">
			<LeftSideMenu />
			<Header />
			<div className="flex flex-row grow ml-[72px] pl-2">


				<div className="h-full w-full p-2">
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
						<div className="grow rounded-[3px] px-4">
					<div className="border h-full bg-[#151515] border-black grow text-white">Text-to-App</div>
					
				</div>
							
				{blocksOn && <SandpackFileExplorer autoHiddenFiles={true} style={{ height: "100%" }} />}
				{editorOn && <SandpackCodeEditor style={{ height: "100%" }} />}
							<div className="w-[67%]">
							<SandpackPreview
								showNavigator={true}
								showOpenInCodeSandbox={false}
								showRestartButton={true}
								style={{ height: "100%" }}
								actionsChildren={
									<div>
										<button className="bg-[black] text-[#90e86f] p-2 rounded-lg" onClick={() => toggleBlocks(!blocksOn)}>
											Building Blocks
										</button>
										<button className="bg-[black] text-[#90e86f] mx-1 p-2 rounded-lg" onClick={() => toggleEditor(!editorOn)}>
											Toggle Editor
										</button>
									</div>
								}
							/>
							<SimpleCodeViewer />
							</div>
							
						</SandpackLayout>
					</SandpackProvider>
				</div>
			</div>
		</div>
	)
}
