import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from "redux-persist"
import workspaceReducer from "../reducers/workspace-reducer"

const rootReducer = combineReducers({
	workspace: workspaceReducer,
})

const persistConfig = {
	key: "root",
	storage: storage,
	whitelist: ["workspace"],
}

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})
export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const useProject = () =>
	useAppSelector((state: any) => state.workspace.projects.find((proj: any) => (proj.id = state.workspace.activeProject)))

export const useProjects = () => useAppSelector((state: any) => state.workspace.projects)
