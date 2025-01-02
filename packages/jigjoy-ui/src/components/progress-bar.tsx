import React from 'react'
import { motion } from 'framer-motion'

interface ProgressBarProps {
    progressPercent: number
    duration?: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressPercent, duration = 0.5 }) => {
    return (
        <div className="gap-2">
            {/* Outer container for the progress bar */}
            <div className="bg-disabled h-2 rounded-full overflow-hidden">
                {/* Animated bar using Framer Motion */}
                <motion.div
                    className="bg-clickable h-2"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration }}
                />
            </div>
        </div>
    )
}

export default ProgressBar
