import React from "react"
import { Suspense } from "react"
const PuzzleBoxEditor = React.lazy(() => import("@puzzle-box/editor"))

export default function Editor() {
	return (
		<Suspense>
			<PuzzleBoxEditor />
		</Suspense>
	)
}
