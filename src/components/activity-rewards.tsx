import { Button, ProgressBar } from "@honeycomb-app/design"
import CheckboxIcon from "../shared/icons/checkbox-icon"
import CheckmarkIcon from "../shared/icons/checkmark-icon"
import { useNavigate } from "@tanstack/react-router"
import { pageLoaded } from "../reducers/active-page-reducer"
import { useDispatch } from "react-redux"

export default function ActivityRewards() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const user = {
		profileImage: "https://avatars.githubusercontent.com/u/110939072?v=4",
		nickname: "Lotus",
		dateJoined: "Joined on January 1, 2022",
		credits: 4,
		level: 5,
		progressToNextLevel: 40, // as a percentage
	}

	const switchToPricing = () => {
		dispatch(pageLoaded("pricing"))
		navigate({ to: "/pricing" })
	}

	return (
		<div className="flex flex-col font-body h-fit">
			<div className="flex flex-col bg-surface-100 p-4 shadow-md text-white h-full">
				<div className="flex flex-row gap-3 w-full">
					<div className="w-fit">
						<Button onClick={switchToPricing} className="p-0 bg-primary hover:bg-hover-primary px-1 rounded-sm">
							Buy tokens
						</Button>
					</div>
					<div className="text-clickable grow flex flex-row justify-end">
						Balance:&nbsp;<span className="text-wax font-bold">4 tokens</span>
					</div>
				</div>
				<h1 className="w-fit mt-4 text-sm text-base">Activity Rewards</h1>

				<div className="my-3 text-sm text-clickable">Complete challenges to earn tokens</div>
				<ProgressBar progress={30} className="w-full" />
				<div className="my-2 text-sm text-clickable">{user.progressToNextLevel}% done</div>
				<div className="flex flex-row gap-2 items-center w-full text-clickable">
					<CheckboxIcon />
					<div className="text-sm">Create account</div>
					<div className="grow items-end text-xs">2 tokens</div>
				</div>
				<div className="flex flex-row gap-2 items-center w-full text-clickable">
					<CheckmarkIcon />
					<div className="text-sm text-disabled line-through">Meet the team</div>
					<div className="grow items-end text-xs text-wax">2 tokens earned</div>
				</div>
				<div className="flex flex-row gap-2 items-center w-full ">
					<CheckmarkIcon />
					<div className="text-sm text-disabled line-through">Create a project</div>
					<div className="text-wax grow items-end text-xs">2 tokens earned</div>
				</div>
				<div className="flex flex-row gap-2 items-center w-full text-clickable">
					<CheckboxIcon />
					<div className="text-sm">Run ticket execution</div>
					<div className="grow items-end text-xs">2 tokens</div>
				</div>
				<div className="flex flex-row gap-2 items-center w-full text-clickable">
					<CheckboxIcon />
					<div className="text-sm">Deploy to production</div>
					<div className="grow items-end text-xs">2 tokens</div>
				</div>
			</div>
		</div>
	)
}
