import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Project {
	id: string
	files: any
}
interface WorkspaceState {
	projects: Project[]
	activeProject: string
}

let initialState: WorkspaceState = {
	projects: [
		{
			id: "proj",
			files: {
				"/App.tsx": `
export default function App() {
	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<h1 className="text-4xl font-bold text-pink-500">Welcome, to JigJoy Playground!</h1>
		</div>
	);
}`,
			},
		},
	],
	activeProject: "proj",
}

export const editorSlice = createSlice({
	name: "workspace",
	initialState,

	reducers: {
		projectUpdated: (state, action: PayloadAction<any>) => {
			const project = action.payload
			let index = state.projects.findIndex((p: any) => p.id == project.id)
			state.projects.splice(index, 1, project)
		},
	},
})

export const { projectUpdated } = editorSlice.actions

export default editorSlice.reducer
