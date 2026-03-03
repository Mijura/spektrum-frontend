import { createHighlighter } from "shiki"

export const shiki = await createHighlighter({
	themes: ["catppuccin-mocha"],
	langs: ["javascript", "typescript"]
})