import React from "react"
import Modal, { ModalContent, ModalTrigger } from "./components/modal"
import {Chat} from "./components/chat"

export default function App() {
	const handleOpen = () => {
		console.log("Modal opened")
	}

	const handleClose = () => {
		console.log("Modal closed")
	}

	return (
		<div>
			<Chat />
		</div>
	)
}
