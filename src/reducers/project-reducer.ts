import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Project, { ProjectState } from "../shared/types/project"

let initialState: ProjectState = {
	project: {},
}

export const projectSlice = createSlice({
	name: "project",
	initialState,

	reducers: {
		projectOpened: (state, action: PayloadAction<Project>) => {
			state.project = action.payload
		},
	},
})

export const { projectOpened } = projectSlice.actions

export default projectSlice.reducer
