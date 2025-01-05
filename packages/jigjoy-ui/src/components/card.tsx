import { motion } from 'framer-motion'
import React, { useRef } from 'react'

const Card = ({ children, className = '', onClick }) => {
    const dragStartPos = useRef({ x: 0, y: 0 })

    const handlePointerDown = (e) => {
        dragStartPos.current = { x: e.clientX, y: e.clientY }
    }

    const handleClick = (e) => {
        if (!onClick) return

        const dx = Math.abs(e.clientX - dragStartPos.current.x)
        const dy = Math.abs(e.clientY - dragStartPos.current.y)
        const dragDistance = Math.sqrt(dx * dx + dy * dy)

        // Only trigger click if drag distance is less than 5 pixels
        if (dragDistance < 5) {
            onClick()
        }
    }

    return (
        <motion.div
            className={`bg-surface2 rounded-lg p-4 flex gap-4 border border-outline ${onClick ? 'cursor-pointer' : ''} ${className}`}
            onClick={handleClick}
            onPointerDown={handlePointerDown}
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
