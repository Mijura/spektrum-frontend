import React, { useState } from "react"

export default function Tabs(props: any) {
	const [activeTab, setActiveTab] = useState(0)

	return (
		<div className="h-full w-full">
			{/* Tab Buttons */}
			<div className="flex space-x-2 mt-4">
				{React.Children.map(props.children, (child, index) => (
					<button onClick={() => setActiveTab(index)} className={`p-1 rounded-md text-white ${index === activeTab ? "bg-[#6B5A8E] text-white" : "hover:bg-hover text-[#EEEEEE] hover:text-black"} transition-all`}>
						{child.key}
					</button>
				))}
			</div>

			{/* Tab Content */}
			<div className="h-full pt-6">{React.Children.map(props.children, (child, index) => React.cloneElement(child, { display: activeTab === index }))}</div>
		</div>
	)
}
