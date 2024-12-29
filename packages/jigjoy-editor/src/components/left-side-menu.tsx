import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProjectsIcon from "../icons/projects-icon"
import MarketplaceIcon from "../icons/marketplace-icon"
import AchievementsIcon from "../icons/achievements-icon"
import EditorIcon from "../icons/editor-icon"

const LeftSideMenu = () => {
	const [menuExpanded, setMenuExpanded] = useState(false)
	const [editorHovered, setEditorHovered] = useState(false)
	const [marketplaceColor, setMarketplaceColor] = useState("text-[#90E86F]")
	const [projectsColor, setProjectsColor] = useState("text-[#90E86F]")
	const [achievementsColor, setAchievementsColor] = useState("text-[#90E86F]")

	return (
		<motion.div onHoverStart={() => setMenuExpanded(true)} onHoverEnd={() => setMenuExpanded(false)} className="border-r border-r-[#4D4D4D] h-full bg-[#151515] flex flex-col shadow-lg fixed top-0 left-0 z-50 text-white">
			<ul className="flex flex-col gap-2 mt-[100px]">
				<li className="text-[#C5C5C5] hover:text-white flex cursor-pointer hover:bg-[#252525] rounded-lg m-1" onMouseEnter={() => setEditorHovered(true)} onMouseLeave={() => setEditorHovered(false)}>
					<div className="py-2 w-[72px] flex justify-center items-center">
						<EditorIcon hovered={editorHovered} />
					</div>
					<AnimatePresence>
						{menuExpanded && (
							<motion.span initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, width: 0, opacity: 0 }} transition={{ duration: 0.25 }} 
							className={` mr-8 grow flex items-center`}>
								Editor
							</motion.span>
						)}
					</AnimatePresence>
				</li>
				<li className="text-[#C5C5C5] hover:text-white flex cursor-pointer hover:bg-[#252525] rounded-lg m-1" onMouseEnter={() => setMarketplaceColor("text-[#E5FD78]")} onMouseLeave={() => setMarketplaceColor("text-[#90E86F]")}>
					<div className="py-2 w-[72px] flex justify-center items-center">
						<MarketplaceIcon color={marketplaceColor} />
					</div>
					<AnimatePresence>
						{menuExpanded && (
							<motion.span initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, width: 0, opacity: 0 }} transition={{ ease: "linear", duration: 0.25 }} className="mr-8 flex items-center">
								Marketplace
							</motion.span>
						)}
					</AnimatePresence>
				</li>
				<li className="text-[#C5C5C5] hover:text-white flex cursor-pointer hover:bg-[#252525] rounded-lg m-1" onMouseEnter={() => setProjectsColor("text-[#E5FD78]")} onMouseLeave={() => setProjectsColor("text-[#90E86F]")}>
					<div className="py-2 w-[72px] flex justify-center items-center">
						<ProjectsIcon color={projectsColor} />
					</div>
					<AnimatePresence>
						{menuExpanded && (
							<motion.span initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, width: 0, opacity: 0 }} transition={{ ease: "linear", duration: 0.25 }} className="mr-8 flex items-center">
								Projects
							</motion.span>
						)}
					</AnimatePresence>
				</li>
				<li className="text-[#C5C5C5] hover:text-white flex cursor-pointer hover:bg-[#252525] rounded-lg m-1" onMouseEnter={() => setAchievementsColor("text-[#E5FD78]")} onMouseLeave={() => setAchievementsColor("text-[#90E86F]")}>
					<div className="py-2 w-[72px] flex justify-center items-center">
						<AchievementsIcon color={achievementsColor} />
					</div>
					<AnimatePresence>
						{menuExpanded && (
							<motion.span initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, width: 0, opacity: 0 }} transition={{ ease: "linear", duration: 0.25 }} className="mr-8 flex items-center">
								Achievements
							</motion.span>
						)}
					</AnimatePresence>
				</li>
			</ul>
		</motion.div>
	)
}

export default LeftSideMenu
