import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from "redux-persist"
import workspaceReducer from "../reducers/workspace-reducer"
import navigationReducer from "../reducers/navigation-reducer"
import accountReducer from "../reducers/account-reducer"
import onboardingReducer from "../reducers/onboarding-reducer"

const rootReducer = combineReducers({
	workspace: workspaceReducer,
	navigation: navigationReducer,
	account: accountReducer,
	onboarding: onboardingReducer,
})

const persistConfig = {
	key: "root",
	storage: storage,
	whitelist: ["account"],
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

export type RootState = ReturnType<typeof persistor.getState>
