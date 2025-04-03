import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from "redux-persist"
import projectReducer from "../reducers/project-reducer"
import activePageReducer from "../reducers/active-page-reducer"

const rootReducer = combineReducers({
	project: projectReducer,
	activePage: activePageReducer,
})

const persistConfig = {
	key: "root",
	storage: storage,
	whitelist: ["project", "activePage"],
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
