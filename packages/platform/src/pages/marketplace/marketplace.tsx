import React, { lazy, Suspense, useState } from 'react'
const Card = React.lazy(() => import('@jigjoy-ui/card'))

import AppDetails from './app-details'
import LikeButton from '../../components/like-button'
const Button = lazy(() => import('@jigjoy-ui/button'))

const featuredApps = [
    {
        name: 'AssetDash',
        description: 'Get exclusive crypto-native deals, giveaways, discounts…',
        imageUrl:
            'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
        creator: {
            username: 'lotus',
            avatarUrl:
                'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
        }
    },
    {
        name: 'SNS Manager (Beta)',
        description: 'All-in-one tool for SNS',
        imageUrl:
            'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
        creator: {
            username: 'lotus',
            avatarUrl:
                'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
        }
    },
    {
        name: 'Pyre',
        description: 'Learn Solana & Helius DEV in a fun way!',
        imageUrl:
            'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
        creator: {
            username: 'lotus',
            avatarUrl:
                'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
        }
    },
    {
        name: 'Crispr Kiss',
        description: 'Avoid Crisprs and get them to kiss!',
        imageUrl:
            'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
        creator: {
            username: 'lotus',
            avatarUrl:
                'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
        }
    }
]

const exploreApps = [
    {
        name: 'Solend',
        description: 'Solend is a DeFi protocol…',
        imageUrl:
            'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
        creator: {
            username: 'lotus',
            avatarUrl:
                'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
        }
    },
    {
        name: 'DeFi Land',
        description: 'GAMIFIED DECENT…',
        imageUrl:
            'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
        creator: {
            username: 'lotus',
            avatarUrl:
                'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
        }
    },
    {
        name: 'Birdeye',
        description: 'The bird is watching…',
        imageUrl:
            'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
        creator: {
            username: 'lotus',
            avatarUrl:
                'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
        }
    }
]

export default function Marketplace() {
    const [selectedApp, setSelectedApp] = useState(null)

    if (selectedApp) {
        return <AppDetails app={selectedApp} onBack={() => setSelectedApp(null)} />
    }

    return (
        <div className="container h-[100dvh] mx-auto max-w-screen-xl px-4 pt-20">
            {/* === Featured Section === */}
            <h1 className="text-3xl font-bold mb-6 text-clickable">Featured</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {featuredApps.map((app: any) => (
                    <Card key={app.name}>
                        <img src={app.imageUrl} alt={app.name} className="w-[140px] h-full rounded-lg object-cover" />
                        <div className="flex flex-col flex-1 justify-between">
                            <div>
                                <h2 className="text-xl font-semibold mb-2 text-clickable">{app.name}</h2>
                                <p className="text-sm text-base">{app.description}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={app.creator.avatarUrl}
                                            alt={app.creator.username}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <span className="text-base text-gray-400">by {app.creator.username}</span>
                                    </div>
                                    <LikeButton initialLikes={Math.floor(Math.random() * 1000)} />
                                </div>
                                <Suspense>
                                    <Button onClick={() => setSelectedApp(app)}>Launch</Button>
                                </Suspense>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* === Explore Section === */}
            <h1 className="text-3xl font-bold mb-6 text-clickable">Explore</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 pb-20">
                {exploreApps.map((app: any) => (
                    <Card key={app.name}>
                        <img src={app.imageUrl} alt={app.name} className="w-[100px] h-full rounded-lg object-cover" />
                        <div className="flex flex-col flex-1 justify-between">
                            <div>
                                <h2 className="text-lg font-semibold mb-2 text-clickable">{app.name}</h2>
                                <p className="text-sm text-base">{app.description}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={app.creator.avatarUrl}
                                            alt={app.creator.username}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <span className="text-base text-gray-400">by {app.creator.username}</span>
                                    </div>
                                    <LikeButton initialLikes={Math.floor(Math.random() * 1000)} />
                                </div>
                                <Suspense>
                                    <Button onClick={() => setSelectedApp(app)}>Launch</Button>
                                </Suspense>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
