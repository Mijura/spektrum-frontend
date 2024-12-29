import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Header = () => {
	const [isProfileOpen, setIsProfileOpen] = useState(false)

	return (
		<header className="z-50 w-[100%] h-[50px] bg-[#151515] border-b border-[#4D4D4D] text-white flex items-center justify-between shadow-md px-4">
			{/* Left Side: Logo and Navigation */}
			<div className="flex items-center gap-4">
				<div className="text-xl font-bold cursor-pointer">Logo</div>
				{/* <nav className="flex gap-4">
					<button className="hover:text-gray-300">Marketplace</button>
				</nav> */}
			</div>

			{/* Right Side: Help and Profile */}
			<div className="flex items-center gap-4 relative">
				{/* Help Icon */}
				<button className="hover:text-gray-300">
					<span className="material-icons">Help</span>
				</button>

				{/* Profile Icon */}
				<div className="relative">
					<button onClick={() => setIsProfileOpen((prev) => !prev)} className="hover:text-gray-300 flex items-center gap-2">
						<span className="material-icons">username</span>
					</button>

					<AnimatePresence>
						{isProfileOpen && (
							<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md overflow-hidden">
								<ul className="flex flex-col">
									<li className="p-2 hover:bg-gray-100 cursor-pointer">Settings</li>
									<li className="p-2 hover:bg-gray-100 cursor-pointer">Log out</li>
								</ul>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</header>
	)
}

export default Header
