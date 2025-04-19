export const isEmail = (email: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)

export const formatTimestamp = (timestamp: string, options = { timeZone: undefined }) => {
	const date = new Date(timestamp)

	return date.toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
		timeZone: options.timeZone, // Pass 'UTC' if you want UTC time
	})
}
