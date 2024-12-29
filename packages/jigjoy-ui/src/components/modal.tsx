import React, { useState, useRef } from "react"
import ReactDOM from "react-dom"
import { motion, AnimatePresence } from "framer-motion"

export default function Modal({ buttonLabel, modalTitle, children })  {
	const [isOpen, setIsOpen] = useState(false)
	const buttonRef = useRef(null)

	const openModal = () => {
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	return (
		<div>
			{/* Button to open the modal */}
			<button ref={buttonRef} className="px-4 py-2 bg-[#151515] text-[#90e86f] rounded shadow hover:bg-[#252525] focus:outline-none" onClick={openModal}>
				{buttonLabel}
			</button>

			{/* Modal Portal */}
			{typeof document !== "undefined" &&
				ReactDOM.createPortal(
					<AnimatePresence>
						{isOpen && (
							<motion.div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={closeModal}>
								<motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }} className="bg-[#151515] rounded-lg shadow-lg p-12 w-[70%] relative" onClick={(e) => e.stopPropagation()}>
									<h2 className="text-3xl font-semibold mb-8 text-[#90e86f]">{modalTitle}</h2>
									<div className="text-white text-lg space-y-6">{children}</div>
									<button className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl font-bold focus:outline-none" onClick={closeModal}>
										×
									</button>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>,
					document.body
				)}
		</div>
	)
}
