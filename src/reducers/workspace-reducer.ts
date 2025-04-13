import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Project from "../types/project"
import { Ticket } from "../types/ticket"

export interface WorkspaceState {
	selectedProject: Project
	selectedTicket: Ticket | null
}

let initialState: WorkspaceState = {
	selectedProject: {
		tickets: [],
	},
	selectedTicket: null,
}

export const workspaceSlice = createSlice({
	name: "workspace",
	initialState,

	reducers: {
		projectSelected: (state, action: PayloadAction<Project>) => {
			state.selectedProject = action.payload
		},
		ticketCreated: (state, action: PayloadAction<Ticket>) => {
			state.selectedProject.tickets.push(action.payload)
			state.selectedTicket = action.payload
		},
		ticketSelected: (state, action: PayloadAction<Ticket>) => {
			state.selectedTicket = action.payload
		},
	},
})

export const { projectSelected, ticketCreated, ticketSelected } = workspaceSlice.actions

export default workspaceSlice.reducer
