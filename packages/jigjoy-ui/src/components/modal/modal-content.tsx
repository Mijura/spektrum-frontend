import React, { useEffect, useRef } from "react"
import ModalContext from "./modal-context"
import { AnimatePresence, motion } from "framer-motion"
import ReactDOM from "react-dom"

const ModalContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const context = React.useContext(ModalContext)

	if (!context) {
		throw new Error("ModalContent must be used within a Modal")
	}

	const { isOpen, handleClose } = context

	return <AnimatePresence>{isOpen && <ModalPortal onClose={handleClose}>{children}</ModalPortal>}</AnimatePresence>
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
		<motion.div className="fixed inset-0 flex items-center justify-center bg-surface1 bg-opacity-80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
			<motion.div className="bg-surface2 text-base p-6 rounded-lg shadow-lg relative w-auto min-w-[300px]" ref={modalRef} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
				<button className="absolute top-2 right-2 text-clickable hover:text-hover" onClick={onClose}>
					&times;
				</button>
				{children}
			</motion.div>
		</motion.div>,
		document.body,
	)
}

ModalContent.displayName = "ModalContent"

export default ModalContent
