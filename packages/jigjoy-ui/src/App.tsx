import React from "react"
import Tabs from "./components/tabs/tabs"
import Tab from "./components/tabs/tab"

function App() {
	return (
		<div className="bg-[#2F2F2F]">
			<h1 className="text-xl font-bold mb-4">Example Tabs Component</h1>
			<Tabs>
				<Tab key="Create">
					<div>
						<h2 className="text-lg font-semibold">Create</h2>
						<p>This is the content displayed for the first tab.</p>
					</div>
				</Tab>
				<Tab key="Building Blocks">
					<div>
						<h2 className="text-lg font-semibold">Building Blocks</h2>
						<p>This is the content displayed for the second tab.</p>
					</div>
				</Tab>
			</Tabs>
		</div>
	)
}

export default App
