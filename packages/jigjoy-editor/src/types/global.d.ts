declare global {
	interface Window {
		__EvaluatedComponent?: React.FC
		__LOCAL_COMPONENT_REGISTRY: Record<string, React.FC>
	}
}

// Ensure the file is treated as a module
export {}
