import React, { FC } from "react"
import Modal from "./components/modal"
import ModalTrigger from "./components/modal-trigger"
import ModalContent from "./components/modal-content"

export default function App() {
	const handleOpen = () => {
		console.log("Modal opened")
	}

	const handleClose = () => {
		console.log("Modal closed")
	}

	return (
		<div className="p-6">
			<Modal onOpenCallback={handleOpen} onCloseCallback={handleClose}>
				<ModalTrigger>
					<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Open Modal</button>
				</ModalTrigger>
				<ModalContent document={document}>
					<h1 className="text-xl font-bold mb-4">Modal Content</h1>
					<p>This is some content inside the modal.</p>
				</ModalContent>
			</Modal>
		</div>
	)
}
