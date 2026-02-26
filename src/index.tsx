import React from "react"
import ReactDOM from "react-dom/client"
import { routeTree } from "./routeTree.gen"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { JigJoyUIProvider } from "@jigjoy-ai/ui-library"
import { persistor, store } from "./shared/store"
import "./index.css"
import { PostHogProvider } from "@posthog/react"

const root = document.createElement("div")
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root)

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	scrollRestoration: true,
})

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

const options = {
	api_host: process.env.POSTHOG_HOST as string,
	defaults: "2026-01-30",
} as const

rootDiv.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<JigJoyUIProvider theme="dark">
					<PostHogProvider apiKey={process.env.POSTHOG_KEY as string} options={options}>
						<RouterProvider router={router} />
					</PostHogProvider>
				</JigJoyUIProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
)
