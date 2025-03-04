import { store } from "../shared/store"
import { useSelector } from "react-redux"

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export const useAppSelector = useSelector.withTypes<RootState>()

export const usePage = () => useAppSelector((state: any) => state.page.selected)
