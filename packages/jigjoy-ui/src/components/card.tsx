import { motion } from 'framer-motion'
import React from 'react'

const Card = ({ children }) => {
    return (
        <motion.div
            className="bg-surface2 rounded-lg p-4 flex gap-4 border border-outline"
            whileHover={{
                scale: 1.05,
                boxShadow: '0px 0px 20px rgba(229, 253, 120, 0.4)'
            }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            {children}
        </motion.div>
    )
}
export default Card
