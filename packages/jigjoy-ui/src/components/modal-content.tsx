import { motion } from "framer-motion"
import React from "react"
import { FC, ReactNode, useEffect, useRef } from "react"
import ReactDOM from "react-dom"

export interface ModalContentProps {
	onClose?: () => void // passed from Modal
	children: ReactNode
	document: any
}

//
// 5. ModalContent
//
const ModalContent: FC<ModalContentProps> = ({ children, document, onClose }) => {
	if (!onClose) throw new Error("ModalContent must receive onClose from Modal")

	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose()
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [onClose])

	return ReactDOM.createPortal(
		// Use our custom tailwind classes
		<div className="fixed inset-0 flex items-center justify-center bg-surface1 bg-opacity-80">
			<motion.div ref={modalRef} className="bg-surface2 text-white font-body p-6 rounded-lg shadow-lg relative max-w-lg w-full" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
				<button className="absolute top-2 right-2 text-clickable hover:text-hover" onClick={onClose}>
					&times;
				</button>
				{children}
			</motion.div>
		</div>,
		document.body,
	)
}

// Optional: set displayName to help with type guard in production
ModalContent.displayName = "ModalContent"

export default ModalContent
