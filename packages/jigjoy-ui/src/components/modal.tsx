import React, { useState, ReactNode, ReactElement, FC } from "react"
import { AnimatePresence } from "framer-motion"
import ModalContent, { ModalContentProps } from "./modal-content"
import ModalTrigger, { ModalTriggerProps } from "./modal-trigger"

//
// 1. Define interfaces for props
//
interface ModalProps {
	/** children can be any combination of ModalTrigger or ModalContent */
	children: ReactNode
	onOpenCallback?: () => void
	onCloseCallback?: () => void
}

//
// 2. Type guards for child elements
//
function isModalTriggerElement(child: ReactNode): child is ReactElement<ModalTriggerProps> {
	return React.isValidElement(child) && (child.type === ModalTrigger || (child.type as any).displayName === "ModalTrigger")
}

function isModalContentElement(child: ReactNode): child is ReactElement<ModalContentProps> {
	return React.isValidElement(child) && (child.type === ModalContent || (child.type as any).displayName === "ModalContent")
}

//
// 3. Modal Component
//
const Modal: FC<ModalProps> = ({ children, onOpenCallback, onCloseCallback }) => {
	const [isOpen, setIsOpen] = useState(false)

	const handleOpen = () => {
		setIsOpen(true)
		onOpenCallback?.()
	}

	const handleClose = () => {
		setIsOpen(false)
		onCloseCallback?.()
	}

	return (
		<>
			{React.Children.map(children, (child) => {
				if (isModalTriggerElement(child)) {
					// Safe to pass onOpen here
					return React.cloneElement(child, { onOpen: handleOpen })
				}

				if (isModalContentElement(child)) {
					// Safe to pass onClose here
					return <AnimatePresence>{isOpen && React.cloneElement(child, { onClose: handleClose })}</AnimatePresence>
				}

				// Fallback if it's some other element, just return it unmodified
				return child
			})}
		</>
	)
}

export default Modal
