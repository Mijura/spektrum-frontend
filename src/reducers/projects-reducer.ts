import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Project, { ProjectsState } from "../types/project"
import { Ticket } from "../types/ticket"

let initialState: ProjectsState = {
	projects: [],
}

export const projectSlice = createSlice({
	name: "projects",
	initialState,

	reducers: {
		projectsLoaded: (state, action: PayloadAction<Project[]>) => {
			state.projects = action.payload
		},
		projectAdded: (state, action: PayloadAction<Project>) => {
			state.projects.push(action.payload)
		},
		projectDeleted: (state, action: PayloadAction<Ticket>) => {
			const index = state.projects.findIndex((project) => project.id === action.payload.id)
			if (index !== -1) {
				state.projects.splice(index, 1)
			}
		},
	},
})

export const { projectsLoaded, projectAdded, projectDeleted } = projectSlice.actions

export default projectSlice.reducer
