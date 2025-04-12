import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CubeIcon from "../shared/icons/cube-icon"
import WorkspaceIcon from "../shared/icons/workspace-icon"
import DiscordIcon from "../shared/icons/discord-icon"
import { useNavigate } from "@tanstack/react-router"
import { useDispatch } from "react-redux"
import { pageLoaded } from "../reducers/active-page-reducer"
import { useActivePage } from "../hooks/use-active-page"
import ProfileIcon from "../shared/icons/profile-icon"
import LogoutIcon from "../shared/icons/logout-icon"
import { signOut } from "aws-amplify/auth"
import PricingIcon from "../shared/icons/pricing-icon"

const LeftSideMenu = () => {
	const [menuExpanded, setMenuExpanded] = useState(false)
	const [hoveredOption, setHoveredOption] = useState("")
	const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)

	const activePage = useActivePage()

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleOptionClick = (option: string, route: string) => {
		dispatch(pageLoaded(option))
		if (route) {
			navigate({ to: route })
		}
	}

	const handleLogout = async () => {
		await signOut()
		navigate({ to: "/" })
		setIsAccountMenuOpen(false)
	}

	return (
		<motion.div
			onHoverStart={() => setMenuExpanded(true)}
			onHoverEnd={() => setMenuExpanded(false)}
			className="border-r border-r-secondary-200 h-full bg-surface flex flex-col shadow-lg fixed top-0 left-0 z-20 text-secondary"
		>
			<ul className="flex flex-col mt-4">
				{[
					{ name: "profile", icon: ProfileIcon, label: "Profile", route: "/profile" },
					{ name: "workspace", icon: WorkspaceIcon, label: "Workspace", route: "/workspace" },
					{ name: "projects", icon: CubeIcon, label: "Projects", route: "/projects" },
					{ name: "pricing", icon: PricingIcon, label: "Pricing", route: "/pricing" },
				].map(({ name, icon: Icon, label, route }) => (
					<li
						key={name}
						className={`${activePage === name ? "bg-surface-muted" : ""} flex cursor-pointer hover:bg-surface-muted rounded-lg p-1`}
						onMouseEnter={() => setHoveredOption(name)}
						onMouseLeave={() => setHoveredOption("")}
						onClick={() => handleOptionClick(name, route)}
						style={{
							filter: hoveredOption && hoveredOption !== name ? "blur(2px)" : "none",
							transition: "filter 0.25s ease",
						}}
					>
						<div className="py-2 w-[72px] flex justify-center items-center">
							<Icon
								color={
									activePage === name ? "text-highlight" : hoveredOption === name ? "text-highlight-200" : "text-secondary-100"
								}
							/>
						</div>
						<AnimatePresence>
							{menuExpanded && (
								<motion.span
									initial={{ x: 10, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									exit={{ x: -10, width: 0, opacity: 0 }}
									transition={{ duration: 0.25, ease: "easeInOut" }}
									className={`${activePage === name ? "text-highlight" : hoveredOption === name ? "text-highlight-200" : "text-secondary-100"} mr-8 truncate flex items-center`}
								>
									{label}
								</motion.span>
							)}
						</AnimatePresence>
					</li>
				))}
			</ul>
			<div className="mt-auto mb-3 flex justify-center flex-col text-secondary-100">
				<div
					className={`${
						hoveredOption === "discord" ? "bg-surface-muted" : ""
					} flex cursor-pointer hover:bg-surface-muted rounded-lg p-1`}
					onMouseEnter={() => setHoveredOption("discord")}
					onMouseLeave={() => setHoveredOption("")}
					onClick={() => window.open("https://discord.gg/dvxY9J2kWX", "_blank")}
					style={{
						filter: hoveredOption && hoveredOption !== "discord" ? "blur(2px)" : "none",
						transition: "filter 0.25s ease",
					}}
				>
					<div className="py-2 w-[72px] flex justify-center items-center">
						<DiscordIcon color={hoveredOption === "discord" ? "text-highlight-200" : "text-secondary-100"} />
					</div>
					<AnimatePresence>
						{menuExpanded && (
							<motion.span
								initial={{ x: 10, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								exit={{ x: -10, width: 0, opacity: 0 }}
								transition={{ duration: 0.25, ease: "easeInOut" }}
								className="mr-8 flex items-center hover:text-highlight-200"
							>
								Community
							</motion.span>
						)}
					</AnimatePresence>
				</div>

				<div
					className={`${
						hoveredOption === "logout" ? "bg-surface-muted" : ""
					} flex cursor-pointer hover:bg-surface-muted rounded-lg p-1 items-center`}
					onMouseEnter={() => setHoveredOption("logout")}
					onMouseLeave={() => setHoveredOption("")}
					onClick={handleLogout}
					style={{
						filter: hoveredOption && hoveredOption !== "logout" ? "blur(2px)" : "none",
						transition: "filter 0.25s ease",
					}}
				>
					<div className="py-2 w-[72px] flex justify-center items-center">
						<LogoutIcon color={hoveredOption === "logout" ? "text-highlight-200" : "text-secondary-100"} />
					</div>
					<AnimatePresence>
						{menuExpanded && (
							<motion.span
								initial={{ x: 10, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								exit={{ x: -10, width: 0, opacity: 0 }}
								transition={{ duration: 0.25, ease: "easeInOut" }}
							>
								Logout
							</motion.span>
						)}
					</AnimatePresence>
				</div>
			</div>
		</motion.div>
	)
}

export default LeftSideMenu
