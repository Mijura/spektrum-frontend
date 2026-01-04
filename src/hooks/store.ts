import { store } from "../shared/store"
import { useSelector } from "react-redux"

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector = useSelector.withTypes<RootState>()

export const useProfile = () => useAppSelector((state: any) => state.profile.profile)
export const useLoadedPage = () => useAppSelector((state: any) => state.navigation.page)
export const useSelectedTask = () => useAppSelector((state: any) => state.workspace.selectedTask)
export const useSelectedProject = () => useAppSelector((state: any) => state.workspace.selectedProject)
export const useSelectedProjectId = () => useAppSelector((state: any) => state.workspace.selectedProject?.id)
export const useTaskExecutionHeatmap = () => useAppSelector((state: any) => state.workspace.taskExecutionHeatmap)
export const useTaskExecutionTimeline = () => useAppSelector((state: any) => state.workspace.taskExecutionTimeline)
export const useProjectInitialization = () => useAppSelector((state: any) => state.workspace.projectInitialization)
export const useTaskCreationRequested = () => useAppSelector((state: any) => state.workspace.taskCreationRequested)
export const useEntryPointDev = () => useAppSelector((state: any) => state.workspace.entryPointDev)
export const useEntryPointProd = () => useAppSelector((state: any) => state.workspace.entryPointProd)
