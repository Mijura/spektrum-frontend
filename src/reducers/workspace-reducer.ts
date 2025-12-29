import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Task } from "../types/task"
import { TaskExecutionDetails } from "../types/task-execution"

export interface Project {
	id?: string
	name?: string
	description?: string
	owner?: any
	deploymentId: string | null
	tasks: Task[]
}

export interface TaskExecutionHeatmap {
	date: string
	runCount: number
}

export interface WorkspaceState {
	selectedProject: Project
	selectedTask: Task | null
	taskExecutionTimeline: TaskExecutionDetails[]
	taskExecutionHeatmap: TaskExecutionHeatmap[]
	projectInitialization: boolean
	taskCreationRequested: boolean
	entryPoint: string | null
}

let initialState: WorkspaceState = {
	selectedProject: {
		tasks: [],
		deploymentId: null,
	},
	selectedTask: null,
	taskExecutionTimeline: [],
	taskExecutionHeatmap: [],
	projectInitialization: false,
	taskCreationRequested: false,
	entryPoint: null,
}

export const workspaceSlice = createSlice({
	name: "workspace",
	initialState,

	reducers: {
		projectSelected: (state, action: PayloadAction<Project>) => {
			state.selectedProject = action.payload
		},

		projectUpdated: (state, action: PayloadAction<Project>) => {
			state.selectedProject = action.payload
		},

		taskCreated: (state, action: PayloadAction<Task>) => {
			state.selectedProject.tasks.push(action.payload)
			state.selectedTask = action.payload
			state.taskCreationRequested = false
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

		taskExecutionTimelineUpdated: (state, action: PayloadAction<TaskExecutionDetails[]>) => {
			state.taskExecutionTimeline = action.payload
		},

		taskExecutionHeatmapLoaded: (state, action: PayloadAction<TaskExecutionHeatmap[]>) => {
			state.taskExecutionHeatmap = action.payload
		},

		taskExecutionTriggered: (state, action: PayloadAction<TaskExecutionDetails>) => {
			// adding newly created task execution to the beginning of the timeline
			state.taskExecutionTimeline.unshift(action.payload)
		},

		taskExecutionUpdated: (state, action: PayloadAction<TaskExecutionDetails>) => {
			state.taskExecutionTimeline = state.taskExecutionTimeline.map((taskExecution) =>
				taskExecution.id === action.payload.id ? action.payload : taskExecution,
			)
		},

		taskCreationRequested: (state) => {
			state.taskCreationRequested = true
		},

		taskCreationClosed: (state) => {
			state.taskCreationRequested = false
		},

		projectInitalizationRequested: (state) => {
			state.projectInitialization = true
		},
		projectInitalizationCompleted: (state) => {
			state.projectInitialization = false
		},

		addTasksToProject: (state, action: PayloadAction<Task[]>) => {
			state.selectedProject.tasks.push(...action.payload)
		},

		entryPointLoaded: (state, action: PayloadAction<string>) => {
			state.entryPoint = action.payload
		},

	},
})

export const {
	projectSelected,
	projectUpdated,
	taskCreated,
	taskSelected,
	taskUpdated,
	taskExecutionTimelineUpdated,
	taskExecutionHeatmapLoaded,
	taskExecutionTriggered,
	taskExecutionUpdated,
	taskCreationRequested,
	taskCreationClosed,
	projectInitalizationRequested,
	projectInitalizationCompleted,
	addTasksToProject,
	entryPointLoaded,
} = workspaceSlice.actions

export default workspaceSlice.reducer
