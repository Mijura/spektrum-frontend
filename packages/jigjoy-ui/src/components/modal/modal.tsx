import React, { useState, useRef, useEffect } from "react"
import ReactDOM from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import ModalTrigger from "./modal-trigger"
import ModalContent from "./modal-content"
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
			{/* Render trigger outside the portal */}
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child) && child.type === ModalTrigger) {
					return child
				}
				return null
			})}

			{/* Render modal content inside the portal when open */}
			<AnimatePresence>
				{isOpen && (
					<ModalPortal onClose={handleClose}>
						{React.Children.map(children, (child) => {
							if (React.isValidElement(child) && child.type === ModalContent) {
								return child
							}
							return null
						})}
					</ModalPortal>
				)}
			</AnimatePresence>
		</ModalContext.Provider>
	)
}



// Portal component for modal content
const ModalPortal: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({ onClose, children }) => {
	const modalRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && modalRef.current.contains && !modalRef.current.contains(event.target as Node)) {
				onClose()
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [onClose])

	return ReactDOM.createPortal(
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<motion.div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full" ref={modalRef} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
				<button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
					&times;
				</button>
				{children}
			</motion.div>
		</div>,
		document.body,
	)
}

export default Modal
