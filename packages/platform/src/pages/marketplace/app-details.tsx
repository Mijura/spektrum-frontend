import React, { lazy, Suspense, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Carousel from '../../components/carousel'
import LikeButton from '../../components/like-button'
const Button = lazy(() => import('@jigjoy-ui/button'))

interface AppDetailsProps {
    app: {
        name: string
        description: string
        longDescription?: string
        imageUrl: string
        images: string[]
        creator: {
            username: string
            avatarUrl: string
        }
    }
    onBack: () => void
}

export default function AppDetails({ app, onBack }: AppDetailsProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    return (
        <>
            <div className="bg-surface2 text-white p-6 relative">
                <motion.div
                    className={`container h-[100dvh] max-w-3xl mx-auto relative`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-surface2 rounded-lg p-4 h-auto">
                        <div className="flex flex-row gap-6 mb-8">
                            <img src={app.imageUrl} alt={app.name} className="w-32 h-32 rounded-lg" />
                            <div>
                                <h1 className="text-2xl font-bold mb-4 text-clickable">{app.name}</h1>

                                <p className="text-sm text-base mb-4">{app.description}</p>

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={app.creator.avatarUrl}
                                            alt={app.creator.username}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <span className="text-gray-400 text-sm">
                                            Created by{' '}
                                            <span className="text-white font-medium">{app.creator.username}</span>
                                        </span>
                                    </div>
                                    <LikeButton initialLikes={Math.floor(Math.random() * 1000)} />
                                </div>
                            </div>
                            <div className="mt-auto flex-none justify-end">
                                <Suspense>
                                    <Button>Launch</Button>
                                </Suspense>
                            </div>
                        </div>

                        <div className="border-t border-surface3 pt-6">
                            <h2 className="text-xl font-semibold mb-4 text-clickable">About</h2>
                            <p className="text-sm leading-relaxed mb-2">
                                {app.longDescription ||
                                    `${app.description} This is an extended description that provides more details about the application, its features, and how it can benefit users. The detailed information helps users make an informed decision about using the application.`}
                            </p>
                        </div>

                        {/* Image Carousel */}
                        <div className="p-2 transform overflow-hidden">
                            <Carousel selectedItem={selectedImage} onItemSelect={setSelectedImage}>
                                {[
                                    'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
                                    'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif',
                                    'https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif'
                                ].map((image, index) => (
                                    <div key={index}>
                                        <img
                                            src={image}
                                            alt={`Slide ${index + 1}`}
                                            className="rounded-lg shadow-xl"
                                            onClick={() => setSelectedImage(image)}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Enlarged Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative max-w-[90vw] max-h-[90vh]"
                            onClick={e => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Enlarged view"
                                className="max-w-full max-h-[90vh] rounded-lg"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 text-white bg-surface2 rounded-full p-2 hover:bg-surface3 transition-colors"
                            >
                                ×
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
