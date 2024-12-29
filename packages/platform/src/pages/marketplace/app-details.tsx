import React from 'react'
import { motion } from 'framer-motion'
import AppDetailsCarousel from '../../components/app-details-carousel'
import LikeButton from '../../components/like-button'

interface AppDetailsProps {
    app: {
        name: string
        description: string
        longDescription?: string
        imageUrl: string
        images: string[] // Array of image URLs for the carousel
    }
    onBack: () => void
}

export default function AppDetails({ app, onBack }: AppDetailsProps) {
    return (
        <div className="min-h-screen bg-surface1 text-white p-6">
            <button onClick={onBack} className="mb-8 text-clickable hover:text-hover flex items-center gap-2">
                <span className="text-2xl">←</span> Back to Marketplace
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
            >
                <div className="bg-surface2 rounded-lg p-8">
                    <div className="flex items-start gap-6 mb-8">
                        <img src={app.imageUrl} alt={app.name} className="w-32 h-32 rounded-lg" />
                        <div>
                            <h1 className="text-4xl font-bold mb-4 text-[#90e86f]">{app.name}</h1>
                            <p className="text-lg text-base mb-4">{app.description}</p>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <img src={app.creator.avatarUrl} alt={app.creator.username} className="w-10 h-10 rounded-full" />
                                    <span className="text-gray-400 text-lg">Created by <span className="text-white font-medium">{app.creator.username}</span></span>
                                </div>
                                <LikeButton initialLikes={Math.floor(Math.random() * 1000)} />
                            </div>
                        </div>
                    </div>

                    {/* Image Carousel */}
                    <div className="mb-8">
                        <AppDetailsCarousel
                            images={[
                                'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
                                'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
                                'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
                            ]}
                        />
                    </div>

                    <div className="border-t border-surface3 pt-6">
                        <h2 className="text-2xl font-semibold mb-4 text-[#90e86f]">About</h2>
                        <p className="text-base leading-relaxed">
                            {app.longDescription ||
                                `${app.description} This is an extended description that provides more details about the application, its features, and how it can benefit users. The detailed information helps users make an informed decision about using the application.`}
                        </p>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button className="bg-surface3 hover:bg-hover hover:text-surface1 transition-colors py-3 px-8 rounded-lg text-clickable text-lg">
                            Launch App
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
