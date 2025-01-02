import React from "react"
import PopoverContext from "./popover-context"

interface PopoverTriggerProps {
	children: React.ReactElement
}

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children }) => {
	const context = React.useContext(PopoverContext)

	if (!context) {
		throw new Error("PopoverTrigger must be used within a Popover")
	}

	const { handleOpen, triggerRef } = context

	return React.cloneElement(children, {
		ref: (node: HTMLElement) => {
			triggerRef.current = node // Correctly assign the ref
		},
		onClick: handleOpen,
	})
}

export default PopoverTrigger
