import React, { useState } from "react"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import { motion, AnimatePresence } from "framer-motion"

const scope = {
	React, // Add React to the scope so it can be used in the live editor
	motion,
	useState,
	AnimatePresence,
}

const code = `
`

const LiveCodeExample = () => {
	return (
		<LiveProvider code={code} scope={scope}>
			<LiveError style={{ color: "red" }} />
			<h2>Live Code Editor</h2>

			<LiveEditor style={{ fontFamily: "monospace", fontSize: "14px" }} />

			<div style={{ border: "1px solid #ddd", padding: "10px", marginTop: "10px" }}>
				<h3>Preview</h3>
				<LivePreview />
			</div>
		</LiveProvider>
	)
}

export default LiveCodeExample
