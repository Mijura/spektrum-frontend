import { SandpackCodeEditor, SandpackFileExplorer, SandpackLayout, SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react"
import { cyberpunk } from "@codesandbox/sandpack-themes"
import React from "react"
import SimpleCodeViewer from "./simple-code-viewer"

export default function App() {
	const files = {
		"/App.tsx": `
	  
		  export default function App() {
			return (
			  <div className="flex justify-center items-center h-screen bg-gray-100">
				<h1 className="text-4xl font-bold text-pink-500">Hello, Tailwind with Sandpack!</h1>
			  </div>
			);
		  }
		`,
	}

	return (
		<div className="p-20 h-[100dvh]">
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
					<SandpackCodeEditor style={{ height: "100%" }} />
					<SandpackPreview showNavigator={true} showOpenInCodeSandbox={false} showRestartButton={true} style={{ height: "100%" }} />
					<SimpleCodeViewer />
				</SandpackLayout>
			</SandpackProvider>
		</div>
	)
}
