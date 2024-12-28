import React from "react"
import { motion } from "framer-motion"
import ProjectsIcon from "../icons/projects-icon"

const LeftSideMenu = () => {
	return (
		<motion.div initial={{ width: "72px" }} whileHover={{ width: "250px" }} transition={{ duration: 0.3 }} className="h-full bg-gray-800 text-white flex flex-col shadow-lg fixed top-0 left-0 z-50">
			<div className="p-4 text-center">
				<span className="block text-xl font-bold">M</span>
			</div>
			<ul className="flex flex-col gap-2 mt-4">
				<li className="p-2 hover:bg-gray-700 rounded-md cursor-pointer">
					<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="overflow-hidden">
						Marketplace
					</motion.div>
				</li>
				<li className="p-2 hover:bg-gray-700 rounded-md cursor-pointer">
					<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="overflow-hidden">
						Editor
					</motion.div>
				</li>
				<li className="p-2 hover:bg-gray-700 rounded-md cursor-pointer flex items-center">
					<li className="w-[72px] flex justify-center items-center">
						<ProjectsIcon />
						<motion.span initial={{ opacity: 0, x: -20 }} whileHover={{ opacity: 1, x: 0 }} className="ml-4 hidden group-hover:block">
							Projects
						</motion.span>
					</li>
					<motion.div initial={{ opacity: 0, x: -20 }} whileHover={{ opacity: 1, x: 0 }} className="overflow-hidden ml-2">
						Projects
					</motion.div>
				</li>
				<li className="p-2 hover:bg-gray-700 rounded-md cursor-pointer">
					<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="overflow-hidden">
						Achievements
					</motion.div>
				</li>
			</ul>
		</motion.div>
	)
}

export default LeftSideMenu
