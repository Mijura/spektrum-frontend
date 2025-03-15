import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Project, { ProjectState } from "../types/project"
import { v4 as uuidv4 } from "uuid"

let initialState: ProjectState = {
	project: {
		id: uuidv4(),
		name: "My First project",
		description: "This is my first project built with JigJoy",
		chatHistory: [
			{
				id: 1,
				role: "system",
				content: `I'm here to help you create your app! Give me instructions, and I will start creating.`,
			},
		],
	},
}

export const projectSlice = createSlice({
	name: "project",
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

export const { projectUpdated, messageAdded, sourceCodeUpdated } = projectSlice.actions

export default projectSlice.reducer
