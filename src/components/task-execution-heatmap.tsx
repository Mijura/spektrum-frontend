import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import * as d3 from "d3"
import { hexbin as d3Hexbin } from "d3-hexbin"
import { Loader } from "@jigjoy-io/ui-library"
import { fetchHeatmap } from "../api/observability"
import { getCurrentUser } from "aws-amplify/auth"
import { useTaskExecutionHeatmap } from "../hooks/store"
import { useDispatch } from "react-redux"
import { taskExecutionHeatmapLoaded } from "../reducers/workspace-reducer"

const TaskExecutionHeatmap: React.FC = () => {
	const svgRef = useRef<SVGSVGElement>(null)
	const legendRef = useRef<SVGSVGElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const width = 1200
	const height = 350
	const [tooltip, setTooltip] = useState<{ x: number; y: number; date: string; intensity: number } | null>(null)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)
	const heatmapData = useTaskExecutionHeatmap()

	const updateHeatmap = async () => {
		const user = await getCurrentUser()
		const accountId = user.signInDetails?.loginId
		if (!accountId) return
		const heatmap = await fetchHeatmap(accountId)
		dispatch(taskExecutionHeatmapLoaded(heatmap))
		setLoading(false)
	}

	useEffect(() => {
		updateHeatmap()
	}, [])

	useEffect(() => {
		if (!svgRef.current || !legendRef.current || !heatmapData || heatmapData.length === 0) return

		const margin = { top: 20, left: 40 }

		const MapColumns = 53,
			MapRows = 7

		const hexRadius = d3.min([width / ((MapColumns + 0.5) * Math.sqrt(3)), height / ((MapRows + 1 / 3) * 1.5)]) ?? 0

		// Extract min/max dates from heatmapData
		const dates = heatmapData.map((d: { date: string }) => new Date(d.date))
		const minDate = new Date(Math.min(...dates.map((d: Date) => d.getTime())))
		const maxDate = new Date(Math.max(...dates.map((d: Date) => d.getTime())))

		// Generate months based on heatmap data range
		const months = []
		let currentMonth = new Date(minDate.getFullYear(), minDate.getMonth(), 1)
		while (currentMonth <= maxDate) {
			months.push(currentMonth.toLocaleString("default", { month: "short" }))
			currentMonth.setMonth(currentMonth.getMonth() + 1)
		}

		let maxIntensity = 0

		// Generate hexbin points
		const points: { x: number; y: number; intensity: number; date: string }[] = []
		for (let i = 0; i < MapRows; i++) {
			for (let j = 0; j < MapColumns; j++) {
				let x = hexRadius * j * Math.sqrt(3) + hexRadius + margin.left + 3
				if (i % 2 === 1) x += (hexRadius * Math.sqrt(3)) / 2
				let y = hexRadius * i * 1.5 + hexRadius + margin.top
				let index = j * MapRows + i
				if (index >= heatmapData.length) break
				let intensity = heatmapData[index]?.runCount ?? 0
				if (intensity > maxIntensity) maxIntensity = intensity
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
			.scaleSequential(d3.interpolateLab("#b3b3ff", "#404080")) // Honey gradient
			.domain([0, d3.max(hexData, (d) => d3.mean(d, (p) => p.intensity) || 0) || 0])

		const svg = d3.select(svgRef.current)
		svg.selectAll("*").remove()

		// Weekdays (Show only Mon, Wed, Fri)
		const weekdays = ["Mon", "Wed", "Fri"]
		svg.append("g")
			.selectAll("text")
			.data(weekdays)
			.enter()
			.append("text")
			.attr("x", margin.left - 15)
			.attr("y", (_, i) => i * (hexRadius * 3) + height / weekdays.length / 2)
			.attr("text-anchor", "end")
			.attr("alignment-baseline", "middle")
			.attr("fill", "var(--secondary)")
			.attr("font-size", "12px")
			.text((d) => d)

		// X-Axis (Dynamically determined months)
		svg.append("g")
			.selectAll("text")
			.data(months)
			.enter()
			.append("text")
			.attr("x", (_, i) => (i * width) / months.length + 3 * hexRadius + 3)
			.attr("y", margin.top - 2) // Adjust the y position above hexagons
			.attr("text-anchor", "middle")
			.attr("fill", "var(--secondary)")
			.attr("font-size", "12px")
			.text((d) => d)

		// Draw hexagons
		svg.append("g")
			.selectAll(".hexagon")
			.data(hexData)
			.enter()
			.append("path")
			.attr("class", "hexagon")
			.attr("d", (d) => `M${d.x},${d.y}${hexbin.hexagon()}`)
			.style("fill", (d) => {
				const avgIntensity = d3.mean(d, (p) => p.intensity) || 0
				return avgIntensity === 0 ? "var(--primary)" : color(avgIntensity)
			})
			.attr("stroke", "var(--primary-200)")
			.attr("strokeWidth", "2px")
			.on("mouseover", function (event, d) {
				const avgIntensity = d3.mean(d, (p) => p.intensity) || 0
				const date = d[0]?.date ?? "Unknown"

				setTooltip({
					x: event.clientX + 20,
					y: event.clientY - 20,
					date,
					intensity: avgIntensity,
				})
			})
			.on("mousemove", function (event) {
				setTooltip((prev) => prev && { ...prev, x: event.clientX + 20, y: event.clientY - 20 })
			})
			.on("mouseout", function () {
				setTooltip(null)
			})

		// Add legend
		const legendWidth = 150
		const legendHeight = 60
		const legendSvg = d3.select(legendRef.current)
		legendSvg.selectAll("*").remove()

		const legendHexRadius = 8
		const legendData = [0, 1, 2, 3, 4] // Intensity levels
		const legendSpacing = legendWidth / (legendData.length + 1)

		// Create legend group
		const legend = legendSvg.append("g").attr("transform", `translate(${width - legendWidth}, ${legendHeight / 2})`)

		// Add hexagons to legend
		legend
			.selectAll(".legend-hexagon")
			.data(legendData)
			.enter()
			.append("path")
			.attr("class", "legend-hexagon")
			.attr("d", d3Hexbin().radius(legendHexRadius).hexagon())
			.attr("transform", (d, i) => `translate(${(i + 1) * legendSpacing}, 0)`)
			.style("fill", (d, i) => {
				return d === 0 ? "var(--primary)" : color((maxIntensity * d) / legendData.length)
			})
			.attr("stroke", "var(--secondary-200)")
			.attr("stroke-width", "1px")

		// Add legend text
		legend
			.append("text")
			.attr("x", 0)
			.attr("y", 5)
			.attr("text-anchor", "end")
			.attr("fill", "var(--secondary-100)")
			.attr("font-size", "12px")
			.text("Low")

		legend
			.append("text")
			.attr("x", legendWidth)
			.attr("y", 5)
			.attr("text-anchor", "start")
			.attr("fill", "var(--secondary-100)")
			.attr("font-size", "12px")
			.text("High")

		// Auto-scroll to center the current date
		if (containerRef.current) {
			const today = new Date()
			const timeDiff = today.getTime() - minDate.getTime()
			const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

			// Calculate the position of today's date in the heatmap
			const todayColumn = Math.floor(daysDiff / 7) // Assuming 7 days per column
			const todayX = hexRadius * todayColumn * Math.sqrt(3) + hexRadius + margin.left + 3

			// Calculate scroll position to center today's date
			const containerWidth = containerRef.current.clientWidth
			const scrollLeft = todayX - containerWidth / 2

			// Smooth scroll to the calculated position
			containerRef.current.scrollTo({
				left: Math.max(0, scrollLeft),
				behavior: "smooth",
			})
		}
	}, [heatmapData])

	return (
		<div className="relative max-w-screen overflow-y-hidden">
			<div
				ref={containerRef}
				className="flex w-full mx-auto overflow-x-auto h-fit overflow-y-hidden custom-scrollbar"
			>
				<div className="xs:w-[320px] xl:w-[750px] 2xl:w-[800px] 3xl:w-[1200px]">
					{!loading ? (
						<div>
							<svg ref={svgRef} className="w-[1200px]" style={{ height: height / 2 }} />
							<svg ref={legendRef} className="w-full" style={{ height: "60px" }} />
						</div>
					) : (
						<div className="flex w-full justify-center items-center">
							<Loader size="large" message="Loading activity data..." />
						</div>
					)}
				</div>
			</div>

			{tooltip &&
				createPortal(
					<div
						className="fixed bg-black text-secondary-100 text-sm px-2 py-1 rounded pointer-events-none shadow-md"
						style={{
							top: tooltip.y,
							left: tooltip.x,
							whiteSpace: "nowrap",
							transition: "opacity 0.2s",
							opacity: 1,
						}}
					>
						<strong className="block">{tooltip.date}</strong>
						<span className="block">Activities: {tooltip.intensity}</span>
					</div>,
					document.body,
				)}
		</div>
	)
}

export default TaskExecutionHeatmap
