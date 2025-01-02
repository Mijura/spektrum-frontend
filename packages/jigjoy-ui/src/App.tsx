import React from "react"
import Popover from "./components/popover/popover"
import PopoverTrigger from "./components/popover/popover-trigger"
import PopoverContent from "./components/popover/popover-content"

export default function App() {
	return (
		<div>
			<div className="p-8">
				<Popover position="bottom-end">
					<PopoverTrigger>
						<button className="px-4 py-2 bg-blue-500 text-white rounded">Click Me</button>
					</PopoverTrigger>
					<PopoverContent>
						<div>This is a Popover!</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	)
}
