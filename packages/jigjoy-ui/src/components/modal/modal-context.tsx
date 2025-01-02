import React from "react"

// Context to manage modal state
interface ModalContextProps {
    handleOpen: () => void
    handleClose: () => void
    isOpen: boolean
}

const ModalContext = React.createContext<ModalContextProps | null>(null)

export default ModalContext