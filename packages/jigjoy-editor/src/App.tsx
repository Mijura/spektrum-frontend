import React, { useState } from "react"
import Editor from "@monaco-editor/react"
import "systemjs/dist/system.min"
import * as Babel from "@babel/standalone"

const DynamicComponentLoader = () => {
	const [componentCode, setComponentCode] = useState<string>(`
    import React from 'react';

    const ChildComponent = () => <p>This is a child component!</p>;
    export default ChildComponent;
  `)
	const [componentRegistry, setComponentRegistry] = useState<Record<string, React.FC>>({})
	const [selectedComponent, setSelectedComponent] = useState<string>("")
	const [error, setError] = useState<string | null>(null)

	const preprocessCode = (code: string) => {
		return (
			code
				// Replace default React import
				.replace(/import\s+React(\s+|,.*?\s+from\s+).*?['"]react['"];?/g, "const React = window.React;")
				// Replace named imports from React
				.replace(/import\s+{([^}]+)}\s+from\s+['"]react['"];?/g, (_, imports) => {
					const bindings = imports
						.split(",")
						.map((i) => i.trim())
						.map((binding) => `const ${binding} = React.${binding};`)
						.join("\n")
					return bindings
				})
				// Ensure hooks are explicitly replaced with React.<hook>
				.replace(/(?<!\w)useState\b/g, "React.useState")
				.replace(/(?<!\w)useEffect\b/g, "React.useEffect")
				.replace(/(?<!\w)useContext\b/g, "React.useContext")
				.replace(/(?<!\w)useReducer\b/g, "React.useReducer")
				.replace(/(?<!\w)useRef\b/g, "React.useRef")
				.replace(/(?<!\w)useMemo\b/g, "React.useMemo")
				.replace(/(?<!\w)useCallback\b/g, "React.useCallback")
				// Replace dynamic component imports with registry lookups
				.replace(/import\s+(\w+)\s+from\s+['"]dynamic:([\w-]+)['"];/g, (_, localName, componentName) => {
					return `const ${localName} = __LOCAL_COMPONENT_REGISTRY["${componentName}"];`
				})
				// Replace export default
				.replace(/export\s+default/, "window.__EvaluatedComponent =")
		)
	}

	const handleAddComponent = async () => {
		try {
			setError(null)

			const preprocessedCode = preprocessCode(componentCode)

			const transpiledCode = Babel.transform(preprocessedCode, {
				presets: [
					[
						"env",
						{
							targets: { esmodules: true },
							modules: false,
						},
					],
					"react",
				],
			}).code

			const blob = new Blob([transpiledCode], { type: "application/javascript" })
			const moduleUrl = URL.createObjectURL(blob)

			// Inject local registry into the evaluation context
			;(window as any).__LOCAL_COMPONENT_REGISTRY = componentRegistry

			await System.import(moduleUrl)

			URL.revokeObjectURL(moduleUrl)

			// Register the evaluated component
			const componentName = componentCode.match(/export\s+default\s+(\w+)/)?.[1]
			if (!componentName || !(window as any).__EvaluatedComponent) {
				throw new Error("The code must export a default component.")
			}

			setComponentRegistry((prevRegistry) => ({
				...prevRegistry,
				[componentName]: (window as any).__EvaluatedComponent,
			}))

			console.log("Component Registry:", componentRegistry)
		} catch (err: any) {
			console.error("Error adding component:", err)
			setError(`Invalid component code: ${err.message}`)
		}
	}

	return (
		<div style={{ padding: "20px" }}>
			<h1>Dynamic Component Loader</h1>

			{/* Monaco Editor */}
			<Editor
				height="400px"
				defaultLanguage="javascript"
				theme="vs-dark"
				value={componentCode}
				onChange={(value) => setComponentCode(value || "")}
				options={{
					selectOnLineNumbers: true,
				}}
			/>

			<button
				onClick={handleAddComponent}
				style={{
					padding: "10px 20px",
					marginTop: "10px",
					backgroundColor: "#007BFF",
					color: "#FFF",
					border: "none",
					cursor: "pointer",
				}}
			>
				Add Component
			</button>

			<br />
			<label>
				<h3>Select Component to Render:</h3>
				<select value={selectedComponent} onChange={(e) => setSelectedComponent(e.target.value)} style={{ padding: "5px", fontSize: "16px" }}>
					<option value="" disabled>
						Select a component
					</option>
					{Object.keys(componentRegistry).map((key) => (
						<option key={key} value={key}>
							{key}
						</option>
					))}
				</select>
			</label>

			<hr />
			<h2>Rendered Component</h2>
			{error ? <p style={{ color: "red" }}>{error}</p> : selectedComponent && componentRegistry[selectedComponent] ? React.createElement(componentRegistry[selectedComponent]) : <p>Please select a component to render.</p>}
		</div>
	)
}

export default DynamicComponentLoader
