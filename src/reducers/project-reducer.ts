import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Project, { ProjectState } from "../shared/types/project"
import { Ticket } from "../shared/types/ticket"

let initialState: ProjectState = {
	project: {
		tickets: [],
	},
}

export const projectSlice = createSlice({
	name: "project",
	initialState,

	reducers: {
		projectOpened: (state, action: PayloadAction<Project>) => {
			state.project = action.payload
		},
		ticketCreated: (state, action: PayloadAction<Ticket>) => {
			state.project.tickets.push(action.payload)
		},
	},
})

export const { projectOpened, ticketCreated } = projectSlice.actions

export default projectSlice.reducer
