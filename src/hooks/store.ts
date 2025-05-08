import { store } from "../shared/store"
import { useSelector } from "react-redux"

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector = useSelector.withTypes<RootState>()

export const useProfile = () => useAppSelector((state: any) => state.profile.profile)
export const useProjects = () => useAppSelector((state: any) => state.projects.projects)
export const useLoadedPage = () => useAppSelector((state: any) => state.navigation.page)
export const useSelectedIssue = () => useAppSelector((state: any) => state.workspace.selectedIssue)
export const useSelectedProject = () => useAppSelector((state: any) => state.workspace.selectedProject)
export const useSelectedProjectId = () => useAppSelector((state: any) => state.workspace.selectedProject?.id)
export const useWorkflowRunTimeline = () => useAppSelector((state: any) => state.workspace.workflowRunTimeline)
export const useProjectInitialization = () => useAppSelector((state: any) => state.workspace.projectInitialization)
