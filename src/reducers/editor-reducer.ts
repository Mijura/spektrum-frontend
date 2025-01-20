import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EditorState } from "./editor-types"
import Project from "../types/project"

let initialState: EditorState = {
	project:
		{
			id: "1bf60676-3a75-41cb-9379-3fa320a162c9",
			name: "My First project",
			description: "This is my first project built with JigJoy",
			imageUrl: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
			sourceCode: {
				"/App.tsx": `
export default function App() {
	return (
	<div>
			<div className="flex justify-center items-center h-screen bg-gray-100">
			<h1 className="text-4xl font-bold text-pink-500">Welcome, to JigJoy Playground!</h1>
		</div>
	
	</div>

	);
}`,
			},
			chatHistory: [		
				{
				id: 1,
				role: "system",
				content: `I'm here to help you create your app! Give me instructions, and I will start creating.`,
			}]
		}
}

export const editorSlice = createSlice({
	name: "editor",
	initialState,

	reducers: {
		projectUpdated: (state, action: PayloadAction<Project>) => {
			state.project = action.payload
		},

		messageAdded: (state, action: PayloadAction<any>) => {
			state.project.chatHistory.push(action.payload)
		},

		sourceCodeUpdated: (state, action: PayloadAction<any>) => {
			state.project.sourceCode = action.payload
		},
	},
})

export const { projectUpdated, messageAdded, sourceCodeUpdated } = editorSlice.actions

export default editorSlice.reducer
