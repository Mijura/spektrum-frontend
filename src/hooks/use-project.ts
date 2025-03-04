import { store } from "../shared/store"
import { useSelector } from "react-redux"

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>

const useAppSelector = useSelector.withTypes<RootState>()

export const useProject = () => useAppSelector((state: any) => state.editor.project)
