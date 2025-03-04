import React from "react"
import { useNavigate } from "@tanstack/react-router"
import ProfileButton from "../pages/my-profile/my-profile-button"
import { Popover, PopoverContent, PopoverTrigger } from "@jigjoy-io/ui"
import { pageLoaded } from "../reducers/page-reducer"
import { useDispatch } from "react-redux"
import { usePage } from "../shared/store"

const Header = () => {
	const navigate = useNavigate()
	const page = usePage()
	const dispatch = useDispatch()

	const switchToPage = (page) => {
		navigate({ to: `/${page}` })
		dispatch(pageLoaded(page))
	}

	const testData = [
		{
			profileImage: "https://avatars.githubusercontent.com/u/110939072?v=4",
			username: "Lotus",
			subscriptionType: "pro",
		},
	]

	return (
		<header className="flex w-[100%] h-[50px] bg-surface-1 border-b border-outline text-white items-center justify-between shadow-md px-4">
			{/* Left Side: Logo and Navigation */}
			<div className="flex items-center gap-4">
				<div className="text-xl font-bold cursor-pointer">Logo</div>
				{/* <nav className="flex gap-4">
					<button className="hover:text-gray-300">Option</button>
				</nav> */}
			</div>

			{/* Right Side: Help and Profile */}
			<div className="flex items-center gap-4 relative">
				<button
					className={`${page == "pricing" ? "text-secondary" : "text-clickable"} flex items-center gap-2 hover:text-hover cursor-pointer`}
					onClick={() => switchToPage("pricing")}
				>
					<span className="material-icons">Pricing</span>
				</button>

				<Popover position="bottom-end">
					<PopoverTrigger>
						<div className="flex flex-col">
							{testData.map((user, index) => (
								<ProfileButton key={index} profileImage={user.profileImage} username={user.username} />
							))}
						</div>
					</PopoverTrigger>
					<PopoverContent>
						<ul className="flex flex-col w-[150px] text-end">
							<li
								onClick={() => switchToPage("my-profile")}
								className="p-2 hover:bg-surface-1 cursor-pointer text-clickable hover:text-hover transition-colors"
							>
								My Profile
							</li>
							<li className="p-2 hover:bg-surface-1 cursor-pointer text-clickable hover:text-hover transition-colors">
								Log out
							</li>
						</ul>
					</PopoverContent>
				</Popover>
			</div>
		</header>
	)
}

export default Header
