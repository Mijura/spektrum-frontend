import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import { hexbin as d3Hexbin } from "d3-hexbin"
import { useHeatmap } from "@honeycomb-app/jigjoy-react-sdk"

const HexbinActivityChart: React.FC = () => {
	const svgRef = useRef<SVGSVGElement>(null)

	const { heatmapData } = useHeatmap({ gameId: "unicorn-game" })
	useEffect(() => {
		console.log(`heatmapData`, heatmapData)
	}, [heatmapData])

	useEffect(() => {
		if (!svgRef.current) return

		const width = 1200
		const height = 350

		const MapColumns = 53,
			MapRows = 7

		const hexRadius = d3.min([width / ((MapColumns + 0.5) * Math.sqrt(3)), height / ((MapRows + 1 / 3) * 1.5)]) ?? 0

		const totalHexagons = MapRows * MapColumns

		// Generate hexagon positions with random activity intensity
		const points: { x: number; y: number; intensity: number }[] = []
		for (let i = 0; i < MapRows; i++) {
			for (let j = 0; j < MapColumns; j++) {
				let x = hexRadius * j * Math.sqrt(3) + hexRadius
				if (i % 2 === 1) x += (hexRadius * Math.sqrt(3)) / 2
				let y = hexRadius * i * 1.5 + hexRadius
				// 30% of the hexagons have 0 intensity
				let index = j * MapRows + i
				let intensity = Math.random() < 0.3 || index >= totalHexagons - 250 ? 0 : Math.random() * 10
				points.push({ x, y, intensity })
			}
		}

		// Create hexbin layout
		const hexbin = d3Hexbin<{ x: number; y: number; intensity: number }>()
			.radius(hexRadius)
			.x((d) => d.x)
			.y((d) => d.y)

		// Bin the points into hexagons
		const hexData = hexbin(points)

		// Define color scale based on intensity
		const color = d3
			.scaleSequential(d3.interpolateLab("#FFD700", "#8B4513")) // Honey gradient
			.domain([0, d3.max(hexData, (d) => d3.mean(d, (p) => p.intensity) || 0) || 0])

		// Clear previous SVG content
		const svg = d3.select(svgRef.current)
		svg.selectAll("*").remove()

		// Append hexagons
		svg
			.append("g")
			.selectAll(".hexagon")
			.data(hexData)
			.enter()
			.append("path")
			.attr("class", "hexagon")
			.attr("d", (d) => `M${d.x},${d.y}${hexbin.hexagon()}`)
			.style("fill", (d) => {
				const avgIntensity = d3.mean(d, (p) => p.intensity) || 0
				return avgIntensity === 0 ? "var(--surface-100)" : color(avgIntensity) // Gray for zero-intensity hexagons
			})
			.attr("stroke", "var(--surface-300)")
			.attr("strokeWidth", "2px")
	}, [])

	return <svg ref={svgRef} className="w-full" />
}

export default HexbinActivityChart
