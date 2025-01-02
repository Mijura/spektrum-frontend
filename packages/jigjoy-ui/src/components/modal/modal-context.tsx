import React from "react"

interface ModalContextProps {
	handleOpen: () => void
	handleClose: () => void
	isOpen: boolean
}

const ModalContext = React.createContext<ModalContextProps | null>(null)

export default ModalContext
