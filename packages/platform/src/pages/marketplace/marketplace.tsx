import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface AppDetailsProps {
    app: {
        name: string;
        description: string;
        longDescription?: string;
        imageUrl: string;
        images: string[] // Array of image URLs for the carousel
        creator: {
            username: string;
            avatarUrl: string;
        }
    }
    onBack: () => void
}

import AppDetails from './app-details'
import LikeButton from '../../components/like-button'

const featuredApps = [
    {
        name: 'AssetDash',
        description: 'Get exclusive crypto-native deals, giveaways, discounts…',
        imageUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
        creator: {
            username: 'lotus',
            avatarUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
        }
    },
    {
        name: 'SNS Manager (Beta)',
        description: 'All-in-one tool for SNS',
        imageUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
        creator: {
            username: 'lotus',
            avatarUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
        }
    },
    {
        name: 'Pyre',
        description: 'Learn Solana & Helius DEV in a fun way!',
        imageUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
        creator: {
            username: 'lotus',
            avatarUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
        }
    },
    {
        name: 'Crispr Kiss',
        description: 'Avoid Crisprs and get them to kiss!',
        imageUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
        creator: {
            username: 'lotus',
            avatarUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
        }
    }
]

const exploreApps = [
    {
        name: 'Solend',
        description: 'Solend is a DeFi protocol…',
        imageUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
        creator: {
            username: 'lotus',
            avatarUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
        }
    },
    {
        name: 'DeFi Land',
        description: 'GAMIFIED DECENT…',
        imageUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
        creator: {
            username: 'lotus',
            avatarUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
        }
    },
    {
        name: 'Birdeye',
        description: 'The bird is watching…',
        imageUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
        creator: {
            username: 'lotus',
            avatarUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
        }
    }
]

export default function Marketplace() {
    const [selectedApp, setSelectedApp] = useState(null)

    if (selectedApp) {
        return (
            <AppDetails 
                app={selectedApp}
                onBack={() => setSelectedApp(null)}
            />
        )
    }

    return (
        <div className="min-h-screen bg-surface1 text-white p-6">
            {/* === Featured Section === */}
            <h1 className="text-3xl font-bold mb-6 text-[#90e86f]">Featured</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {featuredApps.map(app => (
                    <motion.div
                        key={app.name}
                        className="bg-surface2 rounded-lg p-4 flex gap-4 h-[180px]"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0px 0px 20px rgba(229, 253, 120, 0.4)'
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <img src={app.imageUrl} alt={app.name} className="w-[140px] h-full rounded-lg object-cover" />
                        <div className="flex flex-col flex-1 justify-between">
                            <div>
                                <h2 className="text-xl font-semibold mb-2 text-[#90e86f]">{app.name}</h2>
                                <p className="text-sm text-base">{app.description}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <img src={app.creator.avatarUrl} alt={app.creator.username} className="w-8 h-8 rounded-full" />
                                        <span className="text-base text-gray-400">by {app.creator.username}</span>
                                    </div>
                                    <LikeButton initialLikes={Math.floor(Math.random() * 1000)} />
                                </div>
                                <button 
                                    onClick={() => setSelectedApp(app)}
                                    className="bg-surface3 hover:bg-hover hover:text-surface1 transition-colors py-2 px-4 rounded text-clickable"
                                >
                                    Launch
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* === Explore Section === */}
            <h1 className="text-3xl font-bold mb-6 text-[#90e86f]">Explore</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {exploreApps.map(app => (
                    <motion.div
                        key={app.name}
                        className="bg-surface2 rounded-lg p-3 flex gap-3 h-[140px]"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0px 0px 20px rgba(229, 253, 120, 0.4)'
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <img src={app.imageUrl} alt={app.name} className="w-[100px] h-full rounded-lg object-cover" />
                        <div className="flex flex-col flex-1 justify-between">
                            <div>
                                <h2 className="text-lg font-semibold mb-1 text-[#90e86f]">{app.name}</h2>
                                <p className="text-xs text-base">{app.description}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <img src={app.creator.avatarUrl} alt={app.creator.username} className="w-6 h-6 rounded-full" />
                                        <span className="text-sm text-gray-400">by {app.creator.username}</span>
                                    </div>
                                    <LikeButton initialLikes={Math.floor(Math.random() * 1000)} />
                                </div>
                                <button 
                                    onClick={() => setSelectedApp(app)}
                                    className="bg-surface3 hover:bg-hover hover:text-surface1 transition-colors py-1 px-3 rounded text-clickable text-sm"
                                >
                                    Launch
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
