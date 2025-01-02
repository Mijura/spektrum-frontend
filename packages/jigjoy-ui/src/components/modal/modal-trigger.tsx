import React from "react"
import ModalContext from "./modal-context"

const ModalTrigger: React.FC<{ children: React.ReactElement }> = ({ children }) => {
	const context = React.useContext(ModalContext)

	if (!context) {
		throw new Error("ModalTrigger must be used within a Modal")
	}

	const { handleOpen } = context

	return React.cloneElement(children, { onClick: handleOpen })
}

ModalTrigger.displayName = "ModalTrigger"

export default ModalTrigger
