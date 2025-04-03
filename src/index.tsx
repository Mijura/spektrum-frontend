import React from "react"
import ReactDOM from "react-dom/client"
import { routeTree } from "./routeTree.gen"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { HoneycombUIProvider } from "@honeycomb-app/design"
import { JigJoyProvider } from "@honeycomb-app/jigjoy-react-sdk"
import { persistor, store } from "./shared/store"
import { Amplify } from "aws-amplify"
import "./index.css"

Amplify.configure({
	Auth: {
		Cognito: {
			userPoolId: process.env.USER_POOL_ID || "",
			userPoolClientId: process.env.USER_POOL_WEB_CLIENT_ID || "",
		},
	},
})

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

rootDiv.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<HoneycombUIProvider theme="dark">
					<JigJoyProvider>
						<RouterProvider router={router} />
					</JigJoyProvider>
				</HoneycombUIProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
)
