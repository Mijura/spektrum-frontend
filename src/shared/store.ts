import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from "redux-persist"
import projectReducer from "../reducers/project-reducer"
import activePageReducer from "../reducers/active-page-reducer"
import profileReducer from "../reducers/profile-reducer"
import projectsReducer from "../reducers/projects-reducer"
const rootReducer = combineReducers({
	project: projectReducer,
	activePage: activePageReducer,
	profile: profileReducer,
	projects: projectsReducer,
})

const persistConfig = {
	key: "root",
	storage: storage,
	whitelist: ["project", "activePage", "profile"],
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
