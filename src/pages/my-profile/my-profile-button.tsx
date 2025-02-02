import React, { useState } from "react"

const ProfileButton = ({ profileImage, username, subscriptionType }) => {
	const [isProfileOpen, setIsProfileOpen] = useState(false)

	// Map subscription types to specific CSS classes for border colors
	const borderColorBySubscription = {
		beginner: "border-gray-300",
		pro: "border-yellow-400",
		hardcore: "border-green-500",
		// add other subscription types here
	}

	// Fallback to a default color if subscription type doesn't match
	const borderColorClass = borderColorBySubscription[subscriptionType] || "border-gray-300"

	return (
		<button onClick={() => setIsProfileOpen((prev) => !prev)} className="hover:text-gray-300 flex items-center gap-2">
			<img src={profileImage} alt="Profile" className={`w-8 h-8 rounded-full object-cover border ${borderColorClass}`} />
			<span className="text-base">{username}</span>
		</button>
	)
}

export default ProfileButton
