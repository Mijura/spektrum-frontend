import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { CodeBlock } from "./code-block"

interface DocsCodeBlockProps {
	code: string
	filename?: string
	language?: string
}

export default function DocsCodeBlock({ code, filename, language = "typescript" }: DocsCodeBlockProps) {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error("Failed to copy:", err)
		}
	}

	return (
		<div className="rounded-lg border border-secondary-200 bg-card overflow-hidden my-4">
			{/* Header */}
			<div className="flex items-center justify-between px-4 py-2 bg-background/50 border-b border-border/40">
				<div className="flex items-center gap-2">
					<div className="flex gap-1.5">
						<div className="w-3 h-3 rounded-full bg-red-500/80" />
						<div className="w-3 h-3 rounded-full bg-yellow-500/80" />
						<div className="w-3 h-3 rounded-full bg-green-500/80" />
					</div>
					{filename && <span className="text-xs text-muted-foreground ml-2">{filename}</span>}
				</div>
				<button
					onClick={handleCopy}
					className="p-1.5 rounded hover:bg-border/40 transition-colors"
					aria-label="Copy code"
				>
					<AnimatePresence mode="wait">
						{copied ? (
							<motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
								<Check size={16} className="text-green-500" />
							</motion.div>
						) : (
							<motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
								<Copy size={16} className="text-muted-foreground hover:text-foreground" />
							</motion.div>
						)}
					</AnimatePresence>
				</button>
			</div>

			{/* Code content */}
			<div className="p-4 overflow-x-auto">
				<pre className="text-sm leading-relaxed font-mono">
					<CodeBlock code={code} />
				</pre>
			</div>
		</div>
	)
}
