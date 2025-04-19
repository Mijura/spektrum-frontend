import { store } from "../shared/store"
import { useSelector } from "react-redux"

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector = useSelector.withTypes<RootState>()

export const useProfile = () => useAppSelector((state: any) => state.profile.profile)
export const useProjects = () => useAppSelector((state: any) => state.projects.projects)
export const useLoadedPage = () => useAppSelector((state: any) => state.navigation.page)
export const useSelectedTicket = () => useAppSelector((state: any) => state.workspace.selectedTicket)
export const useSelectedProject = () => useAppSelector((state: any) => state.workspace.selectedProject)
