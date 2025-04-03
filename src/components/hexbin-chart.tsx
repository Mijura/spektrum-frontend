import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import { hexbin as d3Hexbin } from "d3-hexbin"
import { useHeatmap } from "@honeycomb-app/jigjoy-react-sdk"

const HexbinActivityChart: React.FC = () => {
	const svgRef = useRef<SVGSVGElement>(null)
	const tooltipRef = useRef<HTMLDivElement>(null)

	const { heatmapData } = useHeatmap({ gameId: "honeycomb" })

	useEffect(() => {
		if (!svgRef.current || !heatmapData) return

		const width = 1200
		const height = 350

		const MapColumns = 53,
			MapRows = 7

		const hexRadius = d3.min([width / ((MapColumns + 0.5) * Math.sqrt(3)), height / ((MapRows + 1 / 3) * 1.5)]) ?? 0

		const points: { x: number; y: number; intensity: number; date: string }[] = []
		for (let i = 0; i < MapRows; i++) {
			for (let j = 0; j < MapColumns; j++) {
				let x = hexRadius * j * Math.sqrt(3) + hexRadius
				if (i % 2 === 1) x += (hexRadius * Math.sqrt(3)) / 2
				let y = hexRadius * i * 1.5 + hexRadius
				let index = j * MapRows + i
				if (index >= heatmapData.length) break
				let intensity = heatmapData[index]?.count ?? 0
				let date = heatmapData[index]?.date ?? "Unknown"
				points.push({ x, y, intensity, date })
			}
		}

		const hexbin = d3Hexbin<{ x: number; y: number; intensity: number; date: string }>()
			.radius(hexRadius)
			.x((d) => d.x)
			.y((d) => d.y)

		const hexData = hexbin(points)

		const color = d3
			.scaleSequential(d3.interpolateLab("#FFD700", "#8B4513")) // Honey gradient
			.domain([0, d3.max(hexData, (d) => d3.mean(d, (p) => p.intensity) || 0) || 0])

		const svg = d3.select(svgRef.current)
		svg.selectAll("*").remove()

		const hexagons = svg
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
			.on("mouseover", function (event, d) {
				const tooltip = tooltipRef.current
				if (!tooltip) return

				const avgIntensity = d3.mean(d, (p) => p.intensity) || 0
				const date = d[0]?.date ?? "Unknown"

				// Tooltip Positioning
				const { left, top } = svgRef.current!.getBoundingClientRect()
				tooltip.innerHTML = `<div style="white-space: nowrap;">
				<strong style="display: block;">${date}</strong>
				<span style="display: block;">Activities: ${avgIntensity}</span>
			</div>`
				tooltip.style.opacity = "1"
				tooltip.style.zIndex = "1000"
				tooltip.style.left = `${event.clientX - left + 20}px`
				tooltip.style.top = `${event.clientY - top - 20}px`
			})
			.on("mousemove", function (event) {
				const tooltip = tooltipRef.current
				if (!tooltip) return

				// Update tooltip position
				const { left, top } = svgRef.current!.getBoundingClientRect()
				tooltip.style.left = `${event.clientX - left + 20}px`
				tooltip.style.top = `${event.clientY - top - 20}px`
			})
			.on("mouseout", function () {
				const tooltip = tooltipRef.current
				if (!tooltip) return

				// Hide tooltip
				tooltip.style.opacity = "0"
			})
	}, [heatmapData])

	return (
		<div className="relative">
			<svg ref={svgRef} className="w-full" />
			<div
				ref={tooltipRef}
				className="absolute bg-black text-white text-sm px-2 py-1 rounded opacity-0 pointer-events-none shadow-md"
				style={{ transition: "opacity 0.2s" }}
			></div>
		</div>
	)
}

export default HexbinActivityChart
