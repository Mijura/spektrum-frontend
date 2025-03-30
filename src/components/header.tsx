import { useNavigate } from "@tanstack/react-router"
import { Avatar, Button, Popover, PopoverContent, PopoverTrigger } from "@honeycomb-app/design"
import { pageLoaded } from "../reducers/page-reducer"
import { useDispatch } from "react-redux"
import { usePage } from "../hooks/use-page"
import { signOut } from "aws-amplify/auth"

const Header = () => {
	const navigate = useNavigate()
	const page = usePage()
	const dispatch = useDispatch()

	const switchToPage = (page: string) => {
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

	const handleLogout = async () => {
		await signOut()
		navigate({ to: "/" })
	}

	return (
		<header className="flex w-[100%] h-[50px] bg-surface-100 border-b border-outline text-white items-center justify-between shadow-md px-4">
			<div className="flex items-center gap-4">
				<div className="text-xl font-bold cursor-pointer">Logo</div>
			</div>

			<div className="flex items-center gap-4 relative">
				<Button
					onClick={() => switchToPage("/pricing")}
					className="py-1 px-2 bg-secondary hover:bg-hover-secondary rounded-sm"
				>
					Buy tokens
				</Button>

				<Popover position="bottom-end">
					<PopoverTrigger>
						<div className="flex flex-col">
							{testData.map((user, index) => (
								<Avatar key={index} profileImage={user.profileImage} username={user.username} />
							))}
						</div>
					</PopoverTrigger>
					<PopoverContent>
						<ul className="flex flex-col w-[150px] text-end">
							<li
								onClick={() => switchToPage("profile")}
								className="p-2 hover:bg-surface-100 cursor-pointer text-clickable hover:text-hover transition-colors"
							>
								My Profile
							</li>
							<li
								onClick={handleLogout}
								className="p-2 hover:bg-surface-100 cursor-pointer text-clickable hover:text-hover transition-colors"
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
