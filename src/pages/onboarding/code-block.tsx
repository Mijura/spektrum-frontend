import type { HighlighterCore } from "shiki"
import { useEffect, useState } from "react"
import { ShikiMagicMove } from "shiki-magic-move/react"

import "shiki-magic-move/dist/style.css"
import { shiki } from "./shiki"

export function CodeBlock({ code }: { code: string }) {
	const [highlighter, setHighlighter] = useState<HighlighterCore>()

	useEffect(() => {
		async function initializeHighlighter() {
			setHighlighter(shiki)
		}
		initializeHighlighter()
	}, [])

	return (
		<div>
			{highlighter && (
				<>
					<ShikiMagicMove
						lang="ts"
						theme="catppuccin-mocha"
						highlighter={highlighter}
						code={code}
						options={{ delayEnter: 0, duration: 300, stagger: 0.3, lineNumbers: true }}
					/>
				</>
			)}
		</div>
	)
}
