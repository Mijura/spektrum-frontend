import React from "react"
import Modal, { ModalContent, ModalTrigger } from "./components/modal"

export default function App() {
	return (
		<div>
			<Modal>
				<ModalTrigger>
					<button className="bg-surface1">Open</button>
				</ModalTrigger>
				<ModalContent>Hi!</ModalContent>
			</Modal>
		</div>
	)
}
