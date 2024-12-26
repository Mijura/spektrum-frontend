import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"

// Assign React to the global window object
window.React = React

const root = document.createElement("div")
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root)

rootDiv.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
