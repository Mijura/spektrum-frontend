// repo/packages/jigjoy-ui/tailwind.config.js
const { theme, plugins, content } = require("@jigjoy-io/tailwind-config")

module.exports = {
	content: ["../../packages/**/src/**/*.{html,js,ts,jsx,tsx}"],
	theme: {
		...theme,
	},
	plugins: [...plugins],
}
