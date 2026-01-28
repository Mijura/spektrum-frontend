import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import WorkspaceIcon from "../shared/icons/workspace-icon"
import DiscordIcon from "../shared/icons/discord-icon"
import { useNavigate } from "@tanstack/react-router"
import { useDispatch } from "react-redux"
import { pageNavigated } from "../reducers/navigation-reducer"
import HomeIcon from "../shared/icons/home-icon"
import LogoutIcon from "../shared/icons/logout-icon"
import PricingIcon from "../shared/icons/pricing-icon"
import { useLoadedPage } from "../hooks/store"
import { clearUserData } from "../reducers/account-reducer"
import { logout } from "../api/account-and-billing"

const LeftSideMenu = () => {
	const [menuExpanded, setMenuExpanded] = useState(false)
	const [hoveredOption, setHoveredOption] = useState("")

	const loadedPage = useLoadedPage()

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handlePageOpen = (option: string, route: string) => {
		dispatch(pageNavigated(option))
		navigate({ to: route })
	}

	const handleLogout = async () => {
		await logout()
		dispatch(clearUserData())
		navigate({ to: "/" })
	}

	return (
		<motion.div
			onHoverStart={() => setMenuExpanded(true)}
			onHoverEnd={() => setMenuExpanded(false)}
			className="border-r border-r-secondary-200 h-full bg-surface flex flex-col shadow-lg fixed top-0 left-0 z-20 text-secondary"
		>
			<ul className="flex flex-col mt-4">
				{[
					{ name: "home", icon: HomeIcon, label: "Home", route: "/home" },
					{ name: "workspace", icon: WorkspaceIcon, label: "Workspace", route: "/workspace" },
					// { name: "pricing", icon: PricingIcon, label: "Pricing", route: "/pricing" },
				].map(({ name, icon: Icon, label, route }) => (
					<li
						key={name}
						className={`${loadedPage === name ? "bg-surface-muted" : ""} flex cursor-pointer hover:bg-surface-muted rounded-lg p-1`}
						onMouseEnter={() => setHoveredOption(name)}
						onMouseLeave={() => setHoveredOption("")}
						onClick={() => handlePageOpen(name, route)}
						style={{
							filter: hoveredOption && hoveredOption !== name ? "blur(2px)" : "none",
							transition: "filter 0.25s ease",
						}}
					>
						<div className="py-2 w-[72px] flex justify-center items-center">
							<Icon
								color={
									loadedPage === name
										? "text-highlight"
										: hoveredOption === name
											? "text-highlight-200"
											: "text-secondary-100"
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
									className={`${loadedPage === name ? "text-highlight" : hoveredOption === name ? "text-highlight-200" : "text-secondary-100"} mr-8 truncate flex items-center`}
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
						<DiscordIcon
							color={hoveredOption === "discord" ? "text-highlight-200" : "text-secondary-100"}
						/>
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
