import { SandpackCodeEditor, SandpackFileExplorer, SandpackLayout, SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react"
import { cyberpunk } from "@codesandbox/sandpack-themes"
import React, { useState } from "react"
import SimpleCodeViewer from "./simple-code-viewer"
import LeftSideMenu from "./left-side-menu"
import Header from "./header"

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

	return (<div className="flex flex-col h-[100dvh]">
		
		<LeftSideMenu />
		<Header />
		<div className="flex flex-row grow">



<div className="w-[30%] h-full flex justify-center items-center">
	<div className="text-4xl font-bold text-pink-500">Text-to-App</div>
</div>

<div className="h-full w-[70%]">
	<SandpackProvider
		template="react-ts"
		theme={cyberpunk}
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
			<SandpackFileExplorer autoHiddenFiles={true} style={{ height: "100%" }} />
			{editorOn && <SandpackCodeEditor style={{ height: "100%" }} />}
			<SandpackPreview 
				showNavigator={true} 
				showOpenInCodeSandbox={false} 
				showRestartButton={true} 
				style={{ height: "100%" }}
				actionsChildren={
					<button className="bg-pink-500 p-2 rounded-full" onClick={() => toggleEditor(!editorOn)}>
					  Toggle Editor
					</button>
				  } />
			<SimpleCodeViewer />
		</SandpackLayout>
	</SandpackProvider>
</div>
</div>
		</div>
		
	)
}
