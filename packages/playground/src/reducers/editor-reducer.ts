import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Project {
	id: string
	files: any
}
interface EditorState {
	project: Project
}

let initialState: EditorState = {
	project: {
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
}

export const editorSlice = createSlice({
	name: "project",
	initialState,

	reducers: {
		projectUpdated: (state, action: PayloadAction<any>) => {
			state.project = action.payload
		},
	},
})

export const { projectUpdated } = editorSlice.actions

export default editorSlice.reducer
