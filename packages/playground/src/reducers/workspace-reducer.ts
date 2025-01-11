import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WorkspaceState } from "./workspace-types"

let initialState: WorkspaceState = {
	projects: [
		{
			id: "proj",
			name: "My First project",
			description: "This is my first project built with JigJoy",
			imageUrl: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
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
