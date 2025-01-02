import React, { useRef, useState } from "react"
import PopoverContext, { PopoverPosition } from "./popover-context"

interface PopoverProps {
	children: React.ReactNode
	position?: PopoverPosition
	onOpenCallback?: () => void
	onCloseCallback?: () => void
}

const Popover: React.FC<PopoverProps> = ({ children, position = "bottom", onOpenCallback, onCloseCallback }) => {
	const [isOpen, setIsOpen] = useState(false)
	const triggerRef = useRef<HTMLElement | null>(null)

	const handleOpen = () => {
		setIsOpen(true)
		onOpenCallback?.()
	}

	const handleClose = () => {
		setIsOpen(false)
		onCloseCallback?.()
	}

	const contextValue = {
		isOpen,
		handleOpen,
		handleClose,
		position,
		triggerRef,
	}

	return <PopoverContext.Provider value={contextValue}>{React.Children.map(children, (child) => child)}</PopoverContext.Provider>
}

export default Popover
