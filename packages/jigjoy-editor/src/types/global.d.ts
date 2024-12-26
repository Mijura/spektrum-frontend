declare global {
	interface Window {
		__EvaluatedComponent?: React.FC
	}
}

// Ensure the file is treated as a module
export {}
