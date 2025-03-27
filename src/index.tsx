import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { routeTree } from "./routeTree.gen"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { HoneycombUIProvider } from "@honeycomb-app/design"
import { persistor, store } from "./shared/store"
import { AuthProvider } from "./auth"
import { useAuth } from "./hooks/use-auth"

const root = document.createElement("div")
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root)

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	scrollRestoration: true,
	context: {
		isAuthenticated: undefined!, // This will be set after we wrap the app in an AuthProvider
	},
})

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

function App() {
	const isAuthenticated = useAuth()
	return <RouterProvider router={router} context={{ isAuthenticated }} />
}

rootDiv.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<HoneycombUIProvider theme="dark">
					<AuthProvider>
						<App />
					</AuthProvider>
				</HoneycombUIProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
)
