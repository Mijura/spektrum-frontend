import React from "react"
import Modal from "./components/modal"

function App() {
	return (
		<div className="bg-[#2F2F2F]">
			<h1 className="text-xl font-bold mb-4">Example Tabs Component</h1>
			<Modal portalTarget={document.body} buttonLabel="click" modalTitle="Title">hp</Modal>
		</div>
	)
}

export default App
