import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Task } from "../types/task"
import { WorkflowRunDetails } from "../types/workflow-run"

export interface Project {
	id?: string
	name?: string
	description?: string
	owner?: any
	tasks: Task[]
}

export interface WorkspaceState {
	selectedProject: Project
	selectedTask: Task | null
	workflowRunTimeline: WorkflowRunDetails[]
	projectInitialization: boolean
}

let initialState: WorkspaceState = {
	selectedProject: {
		tasks: [],
	},
	selectedTask: null,
	workflowRunTimeline: [],
	projectInitialization: false,
}

export const workspaceSlice = createSlice({
	name: "workspace",
	initialState,

	reducers: {
		projectSelected: (state, action: PayloadAction<Project>) => {
			state.selectedProject = action.payload
		},
		taskCreated: (state, action: PayloadAction<Task>) => {
			state.selectedProject.tasks.push(action.payload)
			state.selectedTask = action.payload
		},
		taskSelected: (state, action: PayloadAction<Task | null>) => {
			state.selectedTask = action.payload
		},
		taskUpdated: (state, action: PayloadAction<Task>) => {
			if (state.selectedTask?.id === action.payload.id) {
				state.selectedTask = action.payload
			}
			state.selectedProject.tasks = state.selectedProject.tasks.map((task) =>
				task.id === action.payload.id ? action.payload : task,
			)
		},
		workflowRunTimelineUpdated: (state, action: PayloadAction<WorkflowRunDetails[]>) => {
			state.workflowRunTimeline = action.payload
		},

		workflowRunTriggered: (state, action: PayloadAction<WorkflowRunDetails>) => {
			// adding newly created workflow run to the beginning of the timeline
			state.workflowRunTimeline.unshift(action.payload)
		},

		workflowRunUpdated: (state, action: PayloadAction<WorkflowRunDetails>) => {
			state.workflowRunTimeline = state.workflowRunTimeline.map((workflowRun) =>
				workflowRun.id === action.payload.id ? action.payload : workflowRun,
			)
		},

		projectInitalizationRequested: (state) => {
			state.projectInitialization = true
		},
		projectInitalizationCompleted: (state) => {
			state.projectInitialization = false
		},
	},
})

export const {
	projectSelected,
	taskCreated,
	taskSelected,
	taskUpdated,
	workflowRunTimelineUpdated,
	workflowRunTriggered,
	workflowRunUpdated,
	projectInitalizationRequested,
	projectInitalizationCompleted,
} = workspaceSlice.actions

export default workspaceSlice.reducer
