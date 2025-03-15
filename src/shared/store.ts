import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from "redux-persist"
import projectReducer from "./reducers/project-reducer"
import pageReducer from "./reducers/page-reducer"

const rootReducer = combineReducers({
	project: projectReducer,
	page: pageReducer,
})

const persistConfig = {
	key: "root",
	storage: storage,
	whitelist: ["project", "page"],
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
