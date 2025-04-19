import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Ticket } from "../types/ticket"

export interface Project {
	id?: string
	name?: string
	description?: string
	owner?: any
	tickets: Ticket[]
}

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
		ticketSelected: (state, action: PayloadAction<Ticket | null>) => {
			state.selectedTicket = action.payload
		},
		ticketUpdated: (state, action: PayloadAction<Ticket>) => {
			state.selectedTicket = action.payload
			state.selectedProject.tickets = state.selectedProject.tickets.map((ticket) =>
				ticket.id === action.payload.id ? action.payload : ticket,
			)
		},
	},
})

export const { projectSelected, ticketCreated, ticketSelected, ticketUpdated } = workspaceSlice.actions

export default workspaceSlice.reducer
