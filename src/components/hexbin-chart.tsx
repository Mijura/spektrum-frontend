import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import { hexbin as d3Hexbin } from "d3-hexbin"

const HexbinActivityChart: React.FC = () => {
	const svgRef = useRef<SVGSVGElement>(null)

	useEffect(() => {
		if (!svgRef.current) return

		const width = 800 // Adjust for wider grid
		const height = 800 // Adjust for height
		const radius = 10 // Radius of each hexagon

		// Simulate random user activity data (365 days in a year)
		const daysInYear = 365
		const points: [number, number][] = [
			[15, 0],
			[15, 25],
			[15, 35],
			[15, 45],
			[15, 55],
		]

		// Hexbin layout setup
		const hexbin = d3Hexbin()
			.radius(radius)
			.extent([
				[0, 0],
				[width, height],
			])

		// Honey color interpolation (light honey to amber)
		const color = d3
			.scaleSequential(d3.interpolateRgb("#FFD700", "#8B4513"))
			.domain([0, d3.max(hexbin(points), (d) => d.length) || 1])

		// Clear previous SVG content
		const svg = d3.select(svgRef.current)
		svg.selectAll("*").remove()

		// Append hexagons
		svg
			.selectAll("path")
			.data(hexbin(points))
			.enter()
			.append("path")
			.attr("d", (d) => `M${d.x},${d.y}${hexbin.hexagon(radius)}`)
			.attr("fill", (d) => color(d.length))
			.attr("stroke", "black") // Black border for visibility
			.attr("stroke-width", 0.5)
	}, [])

	return <svg ref={svgRef} className="w-full h-fit" />
}

export default HexbinActivityChart
