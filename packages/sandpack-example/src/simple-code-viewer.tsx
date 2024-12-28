import { useSandpack } from "@codesandbox/sandpack-react"
import React from "react"

const SimpleCodeViewer = () => {
	const { sandpack } = useSandpack()
	const { files, activeFile } = sandpack

	const code = files[activeFile].code
	return <pre className="hidden">{code}</pre>
}

export default SimpleCodeViewer
