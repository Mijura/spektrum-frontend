import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CubeIcon from "../shared/icons/cube-icon"
import WorkspaceIcon from "../shared/icons/workspace-icon"
import DiscordIcon from "../shared/icons/discord-icon"
import { useNavigate } from "@tanstack/react-router"
import { useDispatch } from "react-redux"
import { pageLoaded } from "../reducers/page-reducer"
import { usePage } from "../hooks/use-page"

const LeftSideMenu = () => {
	const [menuExpanded, setMenuExpanded] = useState(false)
	const [hoveredOption, setHoveredOption] = useState("")

	const page = usePage()

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleOptionClick = (option: string, route: string) => {
		dispatch(pageLoaded(option))
		if (route) {
			navigate({ to: route })
		}
	}

	return (
		<motion.div
			onHoverStart={() => setMenuExpanded(true)}
			onHoverEnd={() => setMenuExpanded(false)}
			className="border-r border-r-outline h-full bg-surface-100 flex flex-col shadow-lg fixed top-0 left-0 z-20 text-base"
		>
			<ul className="flex flex-col mt-[100px]">
				{[
					{ name: "workspace", icon: WorkspaceIcon, label: "Workspace", route: "/" },
					{ name: "projects", icon: CubeIcon, label: "Projects", route: "/projects" },
				].map(({ name, icon: Icon, label, route }) => (
					<li
						key={name}
						className={`${page === name ? "bg-surface-200" : ""} flex cursor-pointer hover:bg-surface-200 rounded-lg p-1`}
						onMouseEnter={() => setHoveredOption(name)}
						onMouseLeave={() => setHoveredOption("")}
						onClick={() => handleOptionClick(name, route)}
						style={{
							filter: hoveredOption && hoveredOption !== name ? "blur(2px)" : "none",
							transition: "filter 0.25s ease",
						}}
					>
						<div className="py-2 w-[72px] flex justify-center items-center">
							<Icon color={page === name ? "text-secondary" : hoveredOption === name ? "text-hover" : "text-clickable"} />
						</div>
						<AnimatePresence>
							{menuExpanded && (
								<motion.span
									initial={{ x: 10, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									exit={{ x: -10, width: 0, opacity: 0 }}
									transition={{ duration: 0.25, ease: "easeInOut" }}
									className={`${page === name ? "text-secondary" : hoveredOption === name ? "text-hover" : "text-clickable"} mr-8 truncate flex items-center`}
								>
									{label}
								</motion.span>
							)}
						</AnimatePresence>
					</li>
				))}
			</ul>
			<div className="mt-auto mb-4 flex justify-center">
				<div
					className={`${
						hoveredOption === "discord" ? "bg-surface-200" : ""
					} flex cursor-pointer hover:bg-surface-200 rounded-lg p-1`}
					onMouseEnter={() => setHoveredOption("discord")}
					onMouseLeave={() => setHoveredOption("")}
					onClick={() => window.open("https://discord.gg/2pjggCfaea", "_blank")}
					style={{
						filter: hoveredOption && hoveredOption !== "discord" ? "blur(2px)" : "none",
						transition: "filter 0.25s ease",
					}}
				>
					<div className="py-2 w-[72px] flex justify-center items-center">
						<DiscordIcon color={hoveredOption === "discord" ? "text-hover" : "text-clickable"} />
					</div>
					<AnimatePresence>
						{menuExpanded && (
							<motion.span
								initial={{ x: 10, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								exit={{ x: -10, width: 0, opacity: 0 }}
								transition={{ duration: 0.25, ease: "easeInOut" }}
								className="mr-8 truncate flex items-center"
							>
								Join Community
							</motion.span>
						)}
					</AnimatePresence>
				</div>
			</div>
		</motion.div>
	)
}

export default LeftSideMenu
