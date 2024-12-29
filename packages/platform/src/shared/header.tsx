import React, { Suspense, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
const Modal = React.lazy(() => import('@jigjoy-ui/modal'))

const Header = () => {
	const [isProfileOpen, setIsProfileOpen] = useState(false)

	return (
		<header className="z-50 w-[100%] h-[50px] bg-[#151515] border-b border-[#4D4D4D] text-white flex items-center justify-between shadow-md px-4">
			{/* Left Side: Logo and Navigation */}
			<div className="flex items-center gap-4">
				<div className="text-xl font-bold cursor-pointer">Logo</div>
				{/* <nav className="flex gap-4">
					<button className="hover:text-gray-300">Option</button>
				</nav> */}
			</div>

			{/* Right Side: Help and Profile */}
			<div className="flex items-center gap-4 relative">
			<Modal portalTarget={document.body} buttonLabel="Docs" modalTitle="Command Help">
					<div>
						<h3 className="text-[#90e86f] text-2xl font-bold mb-4">/help</h3>
						<p className="text-white text-lg mb-6">Shows info about our basic commands and how to get started.</p>
						<h3 className="text-[#90e86f] text-2xl font-bold mb-4">/imagine</h3>
						<p className="text-white text-lg mb-6">Generate a block/app using a textual prompt.</p>
						<h3 className="text-[#90e86f] text-2xl font-bold mb-4">/refine</h3>
						<p className="text-white text-lg">Select a building block to refine.</p>
					</div>
				</Modal>


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
