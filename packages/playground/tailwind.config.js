const colors = {
	surface1: "#151515",
	surface2: "#252525",
	surface3: "#2F2F2F",
	clickable: "#90E86F",
	base: "#808080",
	disabled: "#4D4D4D",
	outline: "#4D4D4D",
	hover: "#E5FD78",
	accent: "#B08DF8",
	error: "#E1CFF8",
	errorSurface: "#b08df8",
	heading: "#C5C5C5",
}

module.exports = {
	content: ["./src/**/*.{html,js,ts,jsx,tsx}", "../jigjoy-ui/src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				surface1: colors.surface1,
				surface2: colors.surface2,
				surface3: colors.surface3,
				clickable: colors.clickable,
				base: colors.base,
				disabled: colors.disabled,
				outline: colors.outline,
				hover: colors.hover,
				accent: colors.accent,
				error: colors.error,
				errorSurface: colors.errorSurface,
				heading: colors.heading,
			},

			fontFamily: {
				body: [
					"-apple-system",
					"BlinkMacSystemFont",
					"Segoe UI",
					"Roboto",
					"Helvetica",
					"Arial",
					"sans-serif",
					"Apple Color Emoji",
					"Segoe UI Emoji",
					"Segoe UI Symbol",
				],
				mono: [
					"Fira Mono",
					"DejaVu Sans Mono",
					"Menlo",
					"Consolas",
					"Liberation Mono",
					"Monaco",
					"Lucida Console",
					"monospace",
				],
			},
			fontSize: {
				body: "13px",
			},
			lineHeight: {
				body: "20px",
			},
			syntax: {
				plain: "#f0fdaf",
				comment: "#757575",
				keyword: "#e5fd78",
				tag: "#f0fdaf",
				punctuation: "#ffffff",
				definition: "#eeeeee",
				property: "#90e86f",
				static: "#ffffff",
				string: "#dafecf",
			},
		},
	},
	plugins: [
		function ({ addBase, addUtilities }) {
			addUtilities({
				".italic-comment": {
					fontStyle: "italic",
					color: "#757575",
				},
			})
		},
	],
}
