import React from "react"

const Avatar = ({ profileImage, username }) => {
	return (
		<button className="cursor-pointer text-base hover:text-gray-300 flex items-center gap-2">
			<img src={profileImage} alt="Profile" className={`w-8 h-8 rounded-full object-cover border border-base`} />
			<span className={`text-clickable hover:text-hover`}>{username}</span>
		</button>
	)
}

export default Avatar
