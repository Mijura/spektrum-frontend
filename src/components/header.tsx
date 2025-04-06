import { useNavigate } from "@tanstack/react-router"
import { Avatar, Popover, PopoverContent, PopoverTrigger } from "@honeycomb-app/design"
import { pageLoaded } from "../reducers/active-page-reducer"
import { useDispatch } from "react-redux"
import { signOut } from "aws-amplify/auth"
import { useActivePage } from "../hooks/use-active-page"
import { useState } from "react"

const Header = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
	const activePage = useActivePage()

	const switchToPage = (page: string) => {
		dispatch(pageLoaded(page))
		navigate({ to: `/${page}` })
		setIsAccountMenuOpen(false)
	}

	const testProfile = {
		image: "https://avatars.githubusercontent.com/u/110939072?v=4",
	}

	const handleLogout = async () => {
		await signOut()
		navigate({ to: "/" })
		setIsAccountMenuOpen(false)
	}

	return (
		<header className="flex w-[100%] h-[50px] bg-primary border-b border-secondary-200 text-white items-center justify-between shadow-md px-4">
			<div className="flex items-center gap-4">
				<div className="text-xl font-bold cursor-pointer">Logo</div>
			</div>

			<div className="flex items-center gap-4 relative">
				<div
					className={`flex items-center gap-2 ${activePage === "pricing" ? "text-highlight" : "text-secondary-100"} cursor-pointer hover:text-secondary transition-colors`}
					onClick={() => switchToPage("pricing")}
				>
					Buy tokens
				</div>

				<Popover position="bottom-end" isOpen={isAccountMenuOpen}>
					<PopoverTrigger>
						<div className="flex flex-col">
							<Avatar image={testProfile.image} alt="Profile" />
						</div>
					</PopoverTrigger>
					<PopoverContent>
						<ul className="flex flex-col w-[150px] h-fit text-end">
							<li
								onClick={() => switchToPage("profile")}
								className="p-2 hover:bg-primary cursor-pointer text-secondary-100 hover:text-hover transition-colors"
							>
								My Profile
							</li>
							<li
								onClick={handleLogout}
								className="p-2 hover:bg-primary cursor-pointer text-secondary-100 hover:text-hover transition-colors"
							>
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
