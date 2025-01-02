import React, { useState } from "react"
import ModalContext from "./modal-context"

// Props for Modal
interface ModalProps {
	children: React.ReactNode
	onOpenCallback?: () => void
	onCloseCallback?: () => void
}

// Main Modal component
const Modal: React.FC<ModalProps> = ({ children, onOpenCallback, onCloseCallback }) => {
	const [isOpen, setIsOpen] = useState(false)

	const handleOpen = () => {
		setIsOpen(true)
		onOpenCallback?.()
	}

	const handleClose = () => {
		setIsOpen(false)
		onCloseCallback?.()
	}

	const modalContext = { handleOpen, handleClose, isOpen }

	return (
		<ModalContext.Provider value={modalContext}>
			{React.Children.map(children, (child: any) => {
				return child
			})}
		</ModalContext.Provider>
	)
}

export default Modal
