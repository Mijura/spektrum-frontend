import { useState } from "react"
import { motion } from "framer-motion"
import React from "react"

function AdventCalendar() {
	const [revealedTiles, setRevealedTiles] = useState(Array(25).fill(false))
	const prizes = ["Candy Cane", "Chocolate", "Gift Card", "Holiday Mug", "Snow Globe", "Cookie", "Stuffed Toy", "Ornament", "Hot Cocoa Mix", "Scarf", "Puzzle", "Holiday Socks", "Gift Box", "Photo Frame", "Notebook", "Keychain", "Pen", "Holiday Candle", "Decorative Lights", "Mini Wreath", "Sticker Set", "Bookmarks", "Mini Calendar", "Earrings", "Surprise Gift"]

	const handleTileClick = (index) => {
		setRevealedTiles((prev) => {
			const newRevealed = [...prev]
			newRevealed[index] = true
			return newRevealed
		})
	}

	return (
		<div className="min-h-screen bg-red-800 text-white p-6">
			<h1 className="text-4xl font-bold text-center mb-8">Christmas Advent Calendar</h1>
			<div className="grid grid-cols-5 gap-4 mx-auto max-w-xl">
				{Array.from({ length: 25 }).map((_, index) => (
					<div key={index} className="relative cursor-pointer" style={{ perspective: "1000px", width: "100px", height: "100px" }} onClick={() => handleTileClick(index)}>
						<motion.div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d", width: "100px", height: "100px" }} initial={{ rotateY: 0 }} animate={{ rotateY: revealedTiles[index] ? 180 : 0 }} transition={{ duration: 0.6 }}>
							<div className="absolute inset-0 flex items-center justify-center bg-red-500 rounded-lg" style={{ backfaceVisibility: "hidden", transform: "rotateY(0deg)", width: "100px", height: "100px" }}>
								<span style={{ textAlign: "center", fontSize: "14px", wordWrap: "break-word" }}>{index + 1}</span>
							</div>
							<div className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-lg" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", width: "100px", height: "100px" }}>
								<span style={{ textAlign: "center", fontSize: "14px", wordWrap: "break-word" }}>{prizes[index]}</span>
							</div>
						</motion.div>
					</div>
				))}
			</div>
		</div>
	)
}

export default AdventCalendar
