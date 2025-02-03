import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProjectsIcon from "../icons/projects-icon"
// import MarketplaceIcon from "../icons/marketplace-icon"
// import QuestsIcon from "../icons/quests-icon"
import EditorIcon from "../icons/editor-icon"
import DiscordIcon from "../icons/discord-icon"
import { useNavigate } from "@tanstack/react-router"

const LeftSideMenu = () => {
	const [menuExpanded, setMenuExpanded] = useState(false)
	const [selectedOption, setSelectedOption] = useState("editor")
	const [hoveredOption, setHoveredOption] = useState("")

	const navigate = useNavigate()

	const handleOptionClick = (option: string, route: string) => {
		setSelectedOption(option)
		if (route) {
			navigate({ to: route })
		}
	}

	return (
		<motion.div
			onHoverStart={() => setMenuExpanded(true)}
			onHoverEnd={() => setMenuExpanded(false)}
			className="border-r border-r-outline h-full bg-surface1 flex flex-col shadow-lg fixed top-0 left-0 z-20 text-base"
		>
			<ul className="flex flex-col mt-[100px]">
				{[
					{ name: "editor", icon: EditorIcon, label: "Editor", route: "/" },
					// { name: "browse", icon: MarketplaceIcon, label: "Browse Components", route: "/browse-components" },
					{ name: "projects", icon: ProjectsIcon, label: "My Projects", route: "/my-projects" },
					// { name: 'rewards', icon: QuestsIcon, label: 'Rewards', route: '/rewards' }
				].map(({ name, icon: Icon, label, route }) => (
					<li
						key={name}
						className={`${selectedOption === name ? "bg-surface2" : ""} flex cursor-pointer hover:bg-surface2 rounded-lg p-1`}
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
								color={selectedOption === name ? "text-accent" : hoveredOption === name ? "text-hover" : "text-clickable"}
							/>
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
						hoveredOption === "discord" ? "bg-surface2" : ""
					} flex cursor-pointer hover:bg-surface2 rounded-lg p-1`}
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
								Join Discord
							</motion.span>
						)}
					</AnimatePresence>
				</div>
			</div>
		</motion.div>
	)
}

export default LeftSideMenu
