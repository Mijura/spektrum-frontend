import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

type ButtonProps = HTMLMotionProps<"button"> & {
    children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
    return (
        <motion.button
            className={`px-4 py-2 bg-clickable text-surface1 rounded-md hover:bg-hover transition-colors duration-200 ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {children}
        </motion.button>
    )
}

export default Button
