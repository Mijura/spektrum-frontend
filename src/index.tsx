import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { routeTree } from "./routeTree.gen"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "./util/store"
import { JigJoyUIProvider } from "@jigjoy-io/ui"

const root = document.createElement("div")
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root)

const router = createRouter({
	routeTree,
})

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

rootDiv.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<JigJoyUIProvider theme="dark">
					<RouterProvider router={router} />
				</JigJoyUIProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
)
