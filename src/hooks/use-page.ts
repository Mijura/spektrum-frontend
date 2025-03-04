import { store } from "../shared/store"
import { useSelector } from "react-redux"

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector = useSelector.withTypes<RootState>()

export const usePage = () => useAppSelector((state: any) => state.page.selected)
