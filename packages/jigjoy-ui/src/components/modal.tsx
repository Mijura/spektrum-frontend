import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalContextProps {
  handleOpen: () => void;
  handleClose: () => void;
  isOpen: boolean;
}

const ModalContext = React.createContext<ModalContextProps | null>(null);

const Modal = ({ children, onOpenCallback, onCloseCallback }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    if (onOpenCallback) onOpenCallback();
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseCallback) onCloseCallback();
  };

  const modalContext = { handleOpen, handleClose, isOpen };

  return (
    <ModalContext.Provider value={modalContext}>
      {children}
      <AnimatePresence>
        {isOpen && <ModalPortal onClose={handleClose} />}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};

const ModalTrigger = ({ children }) => {
  const context = React.useContext(ModalContext);

  if (!context) {
    throw new Error('ModalTrigger must be used within a Modal');
  }

  const { handleOpen } = context;
  return React.cloneElement(children, { onClick: handleOpen });
};

const ModalPortal = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && modalRef.current.contains && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full"
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <ModalContent />
      </motion.div>
    </div>,
    document.body
  );
};

const ModalContent = () => {
  const context = React.useContext(ModalContext);

  if (!context) {
    throw new Error('ModalContent must be used within a Modal');
  }

  const { isOpen } = context;

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Modal Content</h1>
      <p>This is some content inside the modal.</p>
    </div>
  );
};

export default Modal
export { ModalTrigger, ModalContent };
