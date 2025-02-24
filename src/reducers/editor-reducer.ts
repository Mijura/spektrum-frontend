import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EditorState } from "../types/editor"
import Project from "../types/project"
import { v4 as uuidv4 } from "uuid"

const defaultFiles = {
	"src/index.css": `
		@import "tailwindcss";
		`,
	"src/index.tsx": `
		import React from "react"
		import ReactDOM from "react-dom/client"
		import App from "./App"
		import "./index.css"

		ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
			<React.StrictMode>
				<App />
			</React.StrictMode>
		)
	`,

	"src/App.tsx": `
		export default function App() {
    		return (
        		<div className="bg-red-500 text-white p-4">
  					Hello World!
				</div>
    		)
		}
`,
}
let initialState: EditorState = {
	project: {
		projectId: uuidv4(),
		name: "My First project",
		description: "This is my first project built with JigJoy",
		imageUrl: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		sourceCode: defaultFiles,
		chatHistory: [
			{
				id: 1,
				role: "system",
				content: `I'm here to help you create your app! Give me instructions, and I will start creating.`,
			},
		],
	},
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
