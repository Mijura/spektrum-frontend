import React from 'react'
import { motion } from 'framer-motion'
interface AchievementDetailsProps {
    onBack: () => void
    achievement: {
        id: number
        name: string
        icon: string
        status: 'completed' | 'in-progress' | 'locked'
        progress: number
        description: string
        earnedDate: string | null
        preconditions: string[]
    }
}

const ProgressBar = ({ progress }) => {
    return (
        <div className="w-full bg-surface3 h-3 rounded-full overflow-hidden">
            <motion.div 
                className="bg-[#90e86f] h-3"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            />
        </div>
    )
}

const AchievementDetails: React.FC<AchievementDetailsProps> = ({ achievement, onBack }) => {
    const isLocked = achievement.status === 'locked'
    const isCompleted = achievement.status === 'completed'
    const isInProgress = achievement.status === 'in-progress'

    return (
        <div className="bg-surface1 min-h-screen py-10 px-8 text-white">
            <button 
                onClick={onBack}
                className="mb-8 text-[#90e86f] hover:text-hover flex items-center"
            >
                <svg 
                    className="w-6 h-6 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Achievements
            </button>

            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-surface2 rounded-lg p-8 shadow-lg"
                >
                    <div className="flex items-center mb-6">
                        <motion.img
                            src={achievement.icon}
                            alt={achievement.name}
                            className={`w-24 h-24 mr-6 ${isLocked ? 'filter grayscale' : ''}`}
                            whileHover={{ 
                                rotate: [0, -10, 10, -10, 0],
                                transition: {
                                    duration: 0.5,
                                    ease: "easeInOut"
                                }
                            }}
                        />
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{achievement.name}</h1>
                            <div className={`text-lg ${isLocked ? 'text-disabled' : isCompleted ? 'text-[#90e86f]' : 'text-hover'}`}>
                                {isLocked ? 'Locked' : isCompleted ? 'Completed' : 'In Progress'}
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Description</h2>
                        <p className="text-clickable">{achievement.description}</p>
                    </div>

                    {isInProgress && (
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Progress</h2>
                            <ProgressBar progress={achievement.progress} />
                            <p className="mt-2 text-[#90e86f]">{achievement.progress}% Complete</p>
                        </div>
                    )}

                    {isCompleted && achievement.earnedDate && (
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-2">Earned</h2>
                            <p className="text-clickable">
                                {new Date(achievement.earnedDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    )}

                    {isLocked && achievement.preconditions.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Requirements to Unlock</h2>
                            <ul className="space-y-2">
                                {achievement.preconditions.map((condition, index) => (
                                    <li key={index} className="flex items-center text-disabled">
                                        <svg
                                            className="w-5 h-5 mr-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {condition}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}

export default AchievementDetails
