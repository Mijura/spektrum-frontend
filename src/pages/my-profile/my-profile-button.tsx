import React from "react"
import { usePage } from "../../util/store"

const ProfileButton = ({ profileImage, username }) => {
	const page = usePage()

	return (
		<button className="cursor-pointer text-base hover:text-gray-300 flex items-center gap-2">
			<img src={profileImage} alt="Profile" className={`w-8 h-8 rounded-full object-cover border border-base`} />
			<span className={`${page == "my-profile" ? "text-secondary" : "text-clickable"} hover:text-hover`}>{username}</span>
		</button>
	)
}

export default ProfileButton
