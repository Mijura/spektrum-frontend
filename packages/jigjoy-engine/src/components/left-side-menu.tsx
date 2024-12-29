import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProjectsIcon from "../icons/projects-icon"
import MarketplaceIcon from "../icons/marketplace-icon"
import AchievementsIcon from "../icons/achievements-icon"
import EditorIcon from "../icons/editor-icon"

const LeftSideMenu = () => {
	const [menuExpanded, setMenuExpanded] = useState(false)
	const [selectedOption, setSelectedOption] = useState("editor")
	const [hoveredOption, setHoveredOption] = useState("")

	const handleOptionClick = (option) => {
		setSelectedOption(option)
	}

	return (
		<motion.div onHoverStart={() => setMenuExpanded(true)} onHoverEnd={() => setMenuExpanded(false)} className="border-r border-r-[#4D4D4D] h-full bg-[#151515] flex flex-col shadow-lg fixed top-0 left-0 z-50 text-white">
			<ul className="flex flex-col mt-[100px]">
				{[
					{ name: "editor", icon: EditorIcon, label: "Editor" },
					{ name: "marketplace", icon: MarketplaceIcon, label: "Marketplace" },
					{ name: "projects", icon: ProjectsIcon, label: "Projects" },
					{ name: "achievements", icon: AchievementsIcon, label: "Achievements" },
				].map(({ name, icon: Icon, label }) => (
					<li
						key={name}
						className={`${selectedOption === name ? "bg-[#252525] text-white" : "text-[#C5C5C5]"} hover:text-white flex cursor-pointer hover:bg-[#252525] rounded-lg p-1`}
						onMouseEnter={() => setHoveredOption(name)}
						onMouseLeave={() => setHoveredOption("")}
						onClick={() => handleOptionClick(name)}
						style={{
							filter: hoveredOption && hoveredOption !== name ? "blur(2px)" : "none",
							transition: "filter 0.25s ease",
						}}
					>
						<div className="py-2 w-[72px] flex justify-center items-center">
							<Icon color={selectedOption === name ? "text-[#B08DF8]" : hoveredOption === name ? "text-[#E5FD78]" : "text-[#90E86F]"} />
						</div>
						<AnimatePresence>
							{menuExpanded && (
								<motion.span initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, width: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="mr-8 flex items-center">
									{label}
								</motion.span>
							)}
						</AnimatePresence>
					</li>
				))}
			</ul>
		</motion.div>
	)
}

export default LeftSideMenu
