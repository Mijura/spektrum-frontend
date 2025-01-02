import React, { Suspense, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "@tanstack/react-router"
import QuestsWidget from "../components/quests-widget"
import DocsIcon from "../icons/docs-icon"
const Modal = React.lazy(() => import("@jigjoy-ui/modal"))
const ModalTrigger = React.lazy(() => import("@jigjoy-ui/modal-trigger"))
const ModalContent = React.lazy(() => import("@jigjoy-ui/modal-content"))
const Popover = React.lazy(() => import("@jigjoy-ui/popover"))
const PopoverTrigger = React.lazy(() => import("@jigjoy-ui/popover-trigger"))
const PopoverContent = React.lazy(() => import("@jigjoy-ui/popover-content"))

const Header = () => {
	const navigate = useNavigate()
	const [isProfileOpen, setIsProfileOpen] = useState(false)

	return (
		<header className="flex w-[100%] h-[50px] bg-[#151515] border-b border-[#4D4D4D] text-white flex items-center justify-between shadow-md px-4">
			{/* Left Side: Logo and Navigation */}
			<div className="flex items-center gap-4">
				<div className="text-xl font-bold cursor-pointer">Logo</div>
				{/* <nav className="flex gap-4">
					<button className="hover:text-gray-300">Option</button>
				</nav> */}
			</div>

			{/* Right Side: Help and Profile */}
			<div className="flex items-center gap-4 relative">
				<QuestsWidget></QuestsWidget>

				<Suspense>
					<Modal>
						<ModalTrigger>
							<div className="cursor-pointer">
								<DocsIcon color="text-clickable" />
							</div>
						</ModalTrigger>
						<ModalContent>
							<div>
								<h3 className="text-clickable text-2xl font-bold mb-4">/help</h3>
								<p className="text-white text-lg mb-6">Shows info about our basic commands and how to get started.</p>
								<h3 className="text-clickable text-2xl font-bold mb-4">/imagine</h3>
								<p className="text-white text-lg mb-6">Generate a block/app using a textual prompt.</p>
								<h3 className="text-clickable text-2xl font-bold mb-4">/refine</h3>
								<p className="text-white text-lg">Select a building block to refine.</p>
							</div>
						</ModalContent>
					</Modal>
				</Suspense>

				<Suspense>
					<Popover position="bottom-end">
						<PopoverTrigger>
							<button onClick={() => setIsProfileOpen((prev) => !prev)} className="hover:text-gray-300 flex items-center gap-2">
								<span className="material-icons">username</span>
							</button>
						</PopoverTrigger>
						<PopoverContent>
							<ul className="flex flex-col w-[150px] text-end">
								<li onClick={() => navigate({ to: "/my-profile" })} className="p-2 hover:bg-surface1 cursor-pointer text-clickable hover:text-hover transition-colors">
									My Profile
								</li>
								<li className="p-2 hover:bg-surface1 cursor-pointer text-clickable hover:text-hover transition-colors">Log out</li>
							</ul>
						</PopoverContent>
					</Popover>
				</Suspense>
			</div>
		</header>
	)
}

export default Header
