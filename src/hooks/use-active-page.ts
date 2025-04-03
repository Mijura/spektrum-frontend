import { store } from "../shared/store"
import { useSelector } from "react-redux"

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector = useSelector.withTypes<RootState>()

export const useActivePage = () => useAppSelector((state: any) => state.activePage.loaded)
