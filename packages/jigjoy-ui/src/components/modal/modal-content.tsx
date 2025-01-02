import React from "react"
import ModalContext from "./modal-context"

const ModalContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const context = React.useContext(ModalContext)

	if (!context) {
		throw new Error("ModalContent must be used within a Modal")
	}

	const { isOpen } = context

	if (!isOpen) {
		return null
	}

	return <>{children}</>
}

ModalContent.displayName = 'ModalContent'

export default ModalContent