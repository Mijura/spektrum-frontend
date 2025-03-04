import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from "redux-persist"
import editorReducer from "./reducers/editor-reducer"
import pageReducer from "./reducers/page-reducer"

const rootReducer = combineReducers({
	editor: editorReducer,
	page: pageReducer,
})

const persistConfig = {
	key: "root",
	storage: storage,
	whitelist: ["editor", "page"],
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
