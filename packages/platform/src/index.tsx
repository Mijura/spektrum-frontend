import React from "react"
import ReactDOM from "react-dom/client"
import "./types/index.d.ts"
import "./index.css"
import { routeTree } from "./routeTree.gen"
import { createRouter, RouterProvider } from "@tanstack/react-router"

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
		<RouterProvider router={router} />
	</React.StrictMode>,
)
