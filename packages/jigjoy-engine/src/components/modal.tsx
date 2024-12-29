import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Reusable modal component.
 *
 * @param {string} buttonLabel - The text displayed on the button that opens the modal.
 * @param {string} modalTitle - The title displayed inside the modal.
 * @param {React.ReactNode} children - The content of the modal (can be text, JSX, etc.).
 */
const Modal = ({ buttonLabel = 'Open Modal', modalTitle = 'Modal Title', children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const buttonRef = useRef(null)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div className="absolute top-4 right-4 z-50">
            {/* Button to open the modal */}
            <button
                ref={buttonRef}
                className="px-4 py-2 bg-[#151515] text-[#90e86f] rounded shadow hover:bg-[#252525] focus:outline-none"
                onClick={openModal}
            >
                {buttonLabel}
            </button>

            {/* Modal Portal */}
            {isOpen &&
                typeof document !== 'undefined' &&
                ReactDOM.createPortal(
                    <AnimatePresence>
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="bg-[#151515] rounded-lg shadow-lg p-6 w-96 relative"
                                onClick={e => e.stopPropagation()}
                            >
                                <h2 className="text-xl font-semibold mb-4 text-[#90e86f]">{modalTitle}</h2>
                                <div className="text-white">{children}</div>
                                <button
                                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 text-xl font-bold focus:outline-none"
                                    onClick={closeModal}
                                >
                                    ×
                                </button>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>,
                    document.body
                )}
        </div>
    )
}

export default Modal
