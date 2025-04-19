import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from "redux-persist"
import workspaceReducer from "../reducers/workspace-reducer"
import navigationReducer from "../reducers/navigation-reducer"
import profileReducer from "../reducers/profile-reducer"
const rootReducer = combineReducers({
	workspace: workspaceReducer,
	navigation: navigationReducer,
	profile: profileReducer,
})

const persistConfig = {
	key: "root",
	storage: storage,
	whitelist: ["workspace", "navigation", "profile", "projects"],
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
