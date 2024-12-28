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
			<div className="flex flex-row grow">
				<div className="grow ml-[72px] my-10 rounded-[3px]">
					<div className="border ml-10 h-full bg-[#151515] border-black grow text-white">Text-to-App</div>
				</div>

				<div className="h-full w-[65%] p-10">
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
							{blocksOn && <SandpackFileExplorer autoHiddenFiles={true} style={{ height: "100%" }} />}
							{editorOn && <SandpackCodeEditor style={{ height: "100%" }} />}
							<SandpackPreview
								showNavigator={true}
								showOpenInCodeSandbox={false}
								showRestartButton={true}
								style={{ height: "100%" }}
								actionsChildren={
									<div>
										<button className="bg-[black] text-white p-2 rounded-lg" onClick={() => toggleBlocks(!blocksOn)}>
											Building Blocks
										</button>
										<button className="bg-[black] text-white mx-1 p-2 rounded-lg" onClick={() => toggleEditor(!editorOn)}>
											Toggle Editor
										</button>
									</div>
								}
							/>
							<SimpleCodeViewer />
						</SandpackLayout>
					</SandpackProvider>
				</div>
			</div>
		</div>
	)
}
