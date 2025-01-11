import React, { lazy, Suspense, useState } from "react"
const Card = lazy(() => import("@jigjoy-ui/card"))
const Carousel = lazy(() => import("@jigjoy-ui/carousel"))
import ProjectDetails from "./project-details"
import LikeButton from "../../components/like-button"
import Project from "../../types/project"

const featuredProjects: Project[] = [
	{
		name: "AssetDash",
		description: "Get exclusive crypto-native deals, giveaways, discounts…",
		imageUrl: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		creator: {
			username: "lotus",
			avatarUrl:
				"https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		},
	},
	{
		name: "SNS Manager (Beta)",
		description: "All-in-one tool for SNS",
		imageUrl: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		creator: {
			username: "lotus",
			avatarUrl:
				"https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		},
	},
	{
		name: "Pyre",
		description: "Learn Solana & Helius DEV in a fun way!",
		imageUrl: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		creator: {
			username: "lotus",
			avatarUrl:
				"https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		},
	},
	{
		name: "Crispr Kiss",
		description: "Avoid Crisprs and get them to kiss!",
		imageUrl: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		creator: {
			username: "lotus",
			avatarUrl:
				"https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		},
	},
]

const exploreProjects: Project[] = [
	{
		name: "Solend",
		description: "Solend is a DeFi protocol for lending and borrowing assets...",
		imageUrl: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		creator: {
			username: "lotus",
			avatarUrl:
				"https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		},
	},
	{
		name: "DeFi Land",
		description: "GAMIFIED DECENTRAL FINANCE",
		imageUrl: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		creator: {
			username: "lotus",
			avatarUrl:
				"https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		},
	},
	{
		name: "Birdeye",
		description: "The bird is watching the markets...",
		imageUrl: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		creator: {
			username: "lotus",
			avatarUrl:
				"https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		},
	},
	{
		name: "Jupiter",
		description: "The best swap aggregator in Solana",
		imageUrl: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		creator: {
			username: "lotus",
			avatarUrl:
				"https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		},
	},
	{
		name: "Orca",
		description: "The friendly DEX for all your trades",
		imageUrl: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		creator: {
			username: "lotus",
			avatarUrl:
				"https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		},
	},
	{
		name: "Marinade",
		description: "Liquid staking solution for Solana",
		imageUrl: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		creator: {
			username: "lotus",
			avatarUrl:
				"https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		},
	},
]

export default function Marketplace() {
	const [selectedProject, setSelectedProject] = useState(null)

	if (selectedProject) {
		return <ProjectDetails project={selectedProject} />
	}

	return (
		<div className="container h-[100dvh] mx-auto max-w-screen-xl px-4 pt-20 h-fit">
			{/* === Featured Section === */}
			<h1 className="text-3xl font-bold mb-6 text-heading">Featured</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
				{featuredProjects.map((project: any) => (
					<Suspense>
						<Card key={project.name} onClick={() => setSelectedProject(project)}>
							<img src={project.imageUrl} alt={project.name} className="w-[140px] h-full rounded-lg object-cover" />
							<div className="flex flex-col flex-1 justify-between">
								<div>
									<h2 className="text-xl font-semibold mb-2 text-heading">{project.name}</h2>
									<p className="text-sm text-base">{project.description}</p>
								</div>
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-2">
										<img src={project.creator.avatarUrl} alt={project.creator.username} className="w-8 h-8 rounded-full" />
										<span className="text-base text-gray-400">by {project.creator.username}</span>
									</div>
									<LikeButton initialLikes={Math.floor(Math.random() * 1000)} />
								</div>
							</div>
						</Card>
					</Suspense>
				))}
			</div>

			{/* === Explore Section === */}
			<h1 className="text-3xl font-bold mb-6 text-heading">Explore</h1>
			<div className="pb-20">
				<Suspense>
					<Carousel itemsPerSlide={3} className="pointer-events-none" showCounter={false}>
						{exploreProjects.map((project: any) => (
							<Card key={project.name} className="pointer-events-auto" onClick={() => setSelectedProject(project)}>
								<div className="flex justify-center items-center">
									<img src={project.imageUrl} alt={project.name} className="w-16 h-16 rounded-full object-cover" />
								</div>
								<div className="flex flex-col flex-1 justify-between">
									<div>
										<h2 className="text-lg font-semibold mb-2 text-heading">{project.name}</h2>
										<p className="text-sm text-base">{project.description}</p>
									</div>
									<div className="flex items-center gap-4 mt-2">
										<div className="flex items-center gap-2">
											<span className="text-base text-gray-400 text-xs">by {project.creator.username}</span>
										</div>
										<div className="scale-75">
											<LikeButton initialLikes={Math.floor(Math.random() * 1000)} />
										</div>
									</div>
								</div>
							</Card>
						))}
					</Carousel>
				</Suspense>
			</div>
		</div>
	)
}
