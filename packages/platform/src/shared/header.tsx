import React, { Suspense, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import ProfileButton from '../pages/my-profile/my-profile-button'
const Modal = React.lazy(() => import('@jigjoy-ui/modal'))
const ModalTrigger = React.lazy(() => import('@jigjoy-ui/modal-trigger'))
const ModalContent = React.lazy(() => import('@jigjoy-ui/modal-content'))
const Popover = React.lazy(() => import('@jigjoy-ui/popover'))
const PopoverTrigger = React.lazy(() => import('@jigjoy-ui/popover-trigger'))
const PopoverContent = React.lazy(() => import('@jigjoy-ui/popover-content'))

const Header = () => {
    const navigate = useNavigate()
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [pricingActive, setPricingActive] = useState(false)
    const switchToPricing = () => {
        navigate({ to: '/pricing' })
        setPricingActive(true)
    }

    const testData = [
        {
            profileImage: 'https://avatars.githubusercontent.com/u/110939072?v=4',
            username: 'Lotus',
            subscriptionType: 'pro'
        }
    ]

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
                <button
                    className={`${pricingActive ? 'text-accent' : 'text-clickable'} flex items-center gap-2 hover:text-hover cursor-pointer`}
                    onClick={switchToPricing}
                >
                    <span className="material-icons">Pricing</span>
                </button>

                <Suspense>
                    <Modal>
                        <ModalTrigger>
                            <button className="flex items-center gap-2 hover:text-hover text-clickable cursor-pointer">
                                <span className="material-icons">Docs</span>
                            </button>
                        </ModalTrigger>
                        <ModalContent>
                            <div>
                                <h3 className="text-clickable text-2xl font-bold mb-4">/help</h3>
                                <p className="text-white text-lg mb-6">
                                    Shows info about our basic commands and how to get started.
                                </p>
                                <h3 className="text-clickable text-2xl font-bold mb-4">/craft</h3>
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
                            <div className="flex flex-col">
                                {testData.map((user, index) => (
                                    <ProfileButton
                                        key={index}
                                        profileImage={user.profileImage}
                                        username={user.username}
                                        subscriptionType={user.subscriptionType}
                                    />
                                ))}
                            </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <ul className="flex flex-col w-[150px] text-end">
                                <li
                                    onClick={() => navigate({ to: '/my-profile' })}
                                    className="p-2 hover:bg-surface1 cursor-pointer text-clickable hover:text-hover transition-colors"
                                >
                                    My Profile
                                </li>
                                <li className="p-2 hover:bg-surface1 cursor-pointer text-clickable hover:text-hover transition-colors">
                                    Log out
                                </li>
                            </ul>
                        </PopoverContent>
                    </Popover>
                </Suspense>
            </div>
        </header>
    )
}

export default Header
