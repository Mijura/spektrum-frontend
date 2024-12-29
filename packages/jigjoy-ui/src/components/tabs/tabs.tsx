import React, { useState } from "react"

export default function Tabs(props: any) {
	const [activeTab, setActiveTab] = useState(0)

	return (
		<div className="w-full">
			{/* Tab Buttons */}
			<div className="flex space-x-2 mt-4">
				{React.Children.map(props.children, (child, index) => (
					<button onClick={() => setActiveTab(index)} className={`px-1 rounded-md text-black ${index === activeTab ? "bg-selected" : "hover:bg-hover text-white hover:text-black"} transition-all`}>
						{child.key}
					</button>
				))}
			</div>

			{/* Tab Content */}
			<div className="pt-6">{React.Children.map(props.children, (child, index) => React.cloneElement(child, { display: activeTab === index }))}</div>
		</div>
	)
}

export function Tab(props: any) {
	const [display, setDisplay] = useState(false)

	React.useEffect(() => {
		setDisplay(props.display)
	}, [props.display])

	return <>{display && props.children}</>
}
