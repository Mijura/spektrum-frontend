import { Button } from "@honeycomb-app/design"
import CheckboxIcon from "../shared/icons/checkbox-icon"
import CheckmarkIcon from "../shared/icons/checkmark-icon"
import { useNavigate } from "@tanstack/react-router"
import { pageLoaded } from "../shared/reducers/page-reducer"
import { useDispatch } from "react-redux"

export default function TokenRewards() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const switchToPricing = () => {
		navigate({ to: "/pricing" })
		dispatch(pageLoaded("pricing"))
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
					<div className="text-base grow flex flex-row justify-end">
						Balance:&nbsp;<span className="text-wax font-bold">40 tokens</span>
					</div>
				</div>
				<h1 className="w-fit mt-4 text-sm">Token Rewards</h1>

				<div className="my-3 text-sm text-base">Complete challenges to earn tokens</div>
				<div className="border-b border-progress w-full border-[2px] rounded-[2px]"></div>
				<div className="my-2 text-sm text-base">100% done</div>
				<div className="flex flex-row gap-2 items-center w-full">
					<CheckboxIcon />
					<div className="text-sm text-base">Create account</div>
					<div className="text-base grow items-end text-xs">20 tokens</div>
				</div>
				<div className="flex flex-row gap-2 items-center w-full">
					<CheckmarkIcon />
					<div className="text-sm text-disabled line-through">Meet the team</div>
					<div className="grow items-end text-xs text-wax">20 tokens earned</div>
				</div>
				<div className="flex flex-row gap-2 items-center w-full">
					<CheckmarkIcon />
					<div className="text-sm text-disabled line-through">Create a project</div>
					<div className="text-wax grow items-end text-xs">20 tokens earned</div>
				</div>
				<div className="flex flex-row gap-2 items-center w-full">
					<CheckboxIcon />
					<div className="text-sm text-base">Create task</div>
					<div className="text-base grow items-end text-xs">20 tokens</div>
				</div>
				<div className="flex flex-row gap-2 items-center w-full">
					<CheckboxIcon />
					<div className="text-sm text-base">Run a workflow</div>
					<div className="text-base grow items-end text-xs">20 tokens</div>
				</div>
				<div className="flex flex-row gap-2 items-center w-full">
					<CheckboxIcon />
					<div className="text-sm text-base">Deploy to production</div>
					<div className="text-base grow items-end text-xs">20 tokens</div>
				</div>
			</div>
		</div>
	)
}
