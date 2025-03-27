import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Project, { ProjectState } from "../types/project"

let initialState: ProjectState = {
	project: {},
}

export const projectSlice = createSlice({
	name: "project",
	initialState,

	reducers: {
		projectUpdated: (state, action: PayloadAction<Project>) => {
			state.project = action.payload
		},
	},
})

export const { projectUpdated } = projectSlice.actions

export default projectSlice.reducer
