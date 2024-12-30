//
// 4. ModalTrigger

import React, { FC, ReactNode } from "react"

export interface ModalTriggerProps {
	onOpen?: () => void // passed from Modal
	children: ReactNode
}

const ModalTrigger: FC<ModalTriggerProps> = ({ children, onOpen }) => {
	if (!onOpen) throw new Error("ModalTrigger must receive onOpen from Modal")

	return React.cloneElement(children as React.ReactElement, {
		onClick: onOpen,
	})
}
// Optional: set displayName to help with type guard in production
ModalTrigger.displayName = "ModalTrigger"

export default ModalTrigger
