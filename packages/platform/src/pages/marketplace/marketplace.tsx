import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AppDetails from './app-details'

const featuredApps = [
    {
        name: 'AssetDash',
        description: 'Get exclusive crypto-native deals, giveaways, discounts…',
        imageUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
    },
    {
        name: 'SNS Manager (Beta)',
        description: 'All-in-one tool for SNS',
        imageUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
    },
    {
        name: 'Pyre',
        description: 'Learn Solana & Helius DEV in a fun way!',
        imageUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
    },
    {
        name: 'Crispr Kiss',
        description: 'Avoid Crisprs and get them to kiss!',
        imageUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
    }
]

const exploreApps = [
    {
        name: 'Solend',
        description: 'Solend is a DeFi protocol…',
        imageUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
    },
    {
        name: 'DeFi Land',
        description: 'GAMIFIED DECENT…',
        imageUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
    },
    {
        name: 'Birdeye',
        description: 'The bird is watching…',
        imageUrl: 'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
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
                        className="bg-surface2 rounded-lg p-4 flex flex-col items-start"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0px 0px 20px rgba(229, 253, 120, 0.4)'
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <img src={app.imageUrl} alt={app.name} className="w-16 h-16 rounded mb-4" />
                        <h2 className="text-xl font-semibold mb-2 text-[#90e86f]">{app.name}</h2>
                        <p className="text-sm mb-4 text-base">{app.description}</p>
                        <div className="w-full flex justify-end mt-2">
                            <button 
                                onClick={() => setSelectedApp(app)}
                                className="bg-surface3 hover:bg-hover hover:text-surface1 transition-colors py-2 px-4 rounded text-clickable"
                            >
                                Launch
                            </button>
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
                        className="bg-surface2 rounded-lg p-3 flex flex-col items-start"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0px 0px 20px rgba(229, 253, 120, 0.4)'
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <img src={app.imageUrl} alt={app.name} className="w-12 h-12 rounded mb-3" />
                        <h2 className="text-lg font-semibold mb-1 text-[#90e86f]">{app.name}</h2>
                        <p className="text-xs mb-2 text-base">{app.description}</p>
                        <div className="w-full flex justify-end mt-2">
                            <button 
                                onClick={() => setSelectedApp(app)}
                                className="bg-surface3 hover:bg-hover hover:text-surface1 transition-colors py-1 px-3 rounded text-clickable text-sm"
                            >
                                Launch
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
