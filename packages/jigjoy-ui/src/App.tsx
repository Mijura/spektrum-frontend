import React from "react"
import Modal from "./components/modal/modal"
import ModalTrigger from "./components/modal/modal-trigger"
import ModalContent from "./components/modal/modal-content"

export default function App() {
	return (
		<div>
			<Modal>
				<ModalTrigger>
					<button>Open</button>
				</ModalTrigger>
				<ModalContent>Hi!</ModalContent>
			</Modal>
		</div>
	)
}
