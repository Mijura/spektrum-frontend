export default function TimelineIcon({ className = "" }: { className?: string }) {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			viewBox="0 0 16 16"
			width="22"
			height="22"
			className={`inline-block ${className}`}
		>
			{/* Background fill to cover the border */}
			<circle cx="8" cy="8" r="4" className="fill-background" />
			{/* Outlined circle on top */}
			<circle cx="8" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
		</svg>
	)
}