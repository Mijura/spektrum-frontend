import React, { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Button, Card } from '@jigjoy-io/ui'

const PricingPage = () => {
    // Card hover animation variants
    const cardVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        whileHover: { scale: 1.05, boxShadow: '0px 0px 20px rgba(229, 253, 120, 0.4)' }
    }

    // Centralized pricing plans data
    const pricingPlans = [
        {
            name: 'Beginner',
            price: 'Free',
            description: 'Earn credits from quests',
            cta: 'Get Started'
        },
        {
            name: 'Pro',
            price: '$20',
            description: 'Earn 20% more credits from quests',
            cta: 'Go Pro'
        },
        {
            name: 'Hardcore',
            price: '$50',
            description: 'Earn 30% more credits from quests + Access to exclusive monthly rewards',
            cta: 'Level Up'
        }
    ]

    return (
        <div className="bg-surface1 text-base min-h-screen flex flex-col items-center px-4 py-8 font-body">
            {/* Page Heading */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl font-bold text-heading mb-8"
            >
                Choose Your Plan
            </motion.h1>

            {/* Pricing Cards Container */}
            <div className="flex flex-col md:flex-row gap-8">
                {pricingPlans.map(plan => (
                    <Card key={plan.name}>
                        <div className="flex flex-col items-center w-[275px]">
                            <div className="h-fit min-h-[150px] flex flex-col items-center">
                                <h2 className="text-xl font-semibold mb-2 text-heading">{plan.name}</h2>
                                <p className="text-accent text-2xl mb-1">{plan.price}</p>
                                <p className="text-base mb-4 text-center">{plan.description}</p>
                            </div>
                            <Button>{plan.cta}</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default PricingPage
