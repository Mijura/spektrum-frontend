import { Button, ProgressBar } from "@honeycomb-app/design"
import CheckboxIcon from "../shared/icons/checkbox-icon"
import CheckmarkIcon from "../shared/icons/checkmark-icon"
import { useNavigate } from "@tanstack/react-router"
import { pageLoaded } from "../reducers/active-page-reducer"
import { useDispatch } from "react-redux"
import { useProfile } from "../hooks/use-profile"

export default function ActivityRewards() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const profile = useProfile()

	const switchToPricing = () => {
		dispatch(pageLoaded("pricing"))
		navigate({ to: "/pricing" })
	}

	return (
		profile && (
			<div className="flex flex-col font-body h-fit">
				<div className="flex flex-col bg-primary p-4 shadow-md text-white h-full">
					<div className="flex flex-row gap-3 w-full">
						<div className="w-fit">
							<Button variant="secondary" onClick={switchToPricing} size="sm">
								Buy tokens
							</Button>
						</div>
						<div className="text-secondary-100 grow flex flex-row justify-end">
							Balance:&nbsp;<span className="text-highlight font-bold">4 tokens</span>
						</div>
					</div>
					<h1 className="w-fit mt-4 text-sm text-highlight">Activity Rewards</h1>

					<div className="my-3 text-sm text-secondary-100">Complete challenges to earn tokens</div>
					<ProgressBar progress={30} className="w-full" />
					<div className="my-2 text-sm text-secondary-100">{profile.progressToNextLevel}% done</div>
					<div className="flex flex-row gap-2 items-center w-full text-secondary-100">
						<CheckboxIcon />
						<div className="text-sm">Create account</div>
						<div className="grow items-end text-xs">2 tokens</div>
					</div>
					<div className="flex flex-row gap-2 items-center w-full text-secondary-100">
						<CheckmarkIcon />
						<div className="text-sm text-secondary-200 line-through">Meet the team</div>
						<div className="grow items-end text-xs text-secondary-100">2 tokens earned</div>
					</div>
					<div className="flex flex-row gap-2 items-center w-full ">
						<CheckmarkIcon />
						<div className="text-sm text-secondary-200 line-through">Create a project</div>
						<div className="grow items-end text-xs text-secondary-100">2 tokens earned</div>
					</div>
					<div className="flex flex-row gap-2 items-center w-full text-secondary-100">
						<CheckboxIcon />
						<div className="text-sm">Create ticket & run workflow</div>
						<div className="grow items-end text-xs">2 tokens</div>
					</div>
					<div className="flex flex-row gap-2 items-center w-full text-secondary-100">
						<CheckboxIcon />
						<div className="text-sm">Deploy to production</div>
						<div className="grow items-end text-xs">2 tokens</div>
					</div>
				</div>
			</div>
		)
	)
}
