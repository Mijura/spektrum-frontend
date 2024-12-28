import { SandpackFileExplorer, SandpackLayout, SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react"
import { ecoLight } from "@codesandbox/sandpack-themes"
import React from "react"

export default function App() {
	const files = {
		"/App.tsx": `export default function App() {
  return <h1>Hello Bro</h1>
}`,
	}

	return (
		<div className="p-20">
			<SandpackProvider template="react-ts" theme={ecoLight} files={files}>
				<SandpackLayout>
					<SandpackFileExplorer initialCollapsedFolder={["/components/src/"]} />
					<SandpackPreview showNavigator={true} showOpenInCodeSandbox={false} />
				</SandpackLayout>
			</SandpackProvider>
		</div>
	)
}
