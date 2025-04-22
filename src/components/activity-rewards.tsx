import { Chevron, ChevronContent, ChevronTrigger, ProgressBar } from "@honeycomb-app/design"
import CheckboxIcon from "../shared/icons/checkbox-icon"
import CheckmarkIcon from "../shared/icons/checkmark-icon"
import { useProfile } from "../hooks/store"

export default function ActivityRewards() {
	const profile = useProfile()

	return (
		profile && (
			<div className="flex flex-col font-body h-fit rounded-sm">
				<div className="flex flex-col bg-surface h-full w-[325px] border border-primary-200">
					<div className="flex flex-row w-full p-3">
						<div className="grow text-secondary-100 text-sm flex flex-row justify-end">
							Balance:&nbsp;<span className="text-highlight font-bold">{profile.tokens} tokens</span>
						</div>
					</div>
					{/* <Chevron defaultExpanded={true} className="w-[325px] border border-primary-200">
						<ChevronTrigger>
							<div className="flex flex-row w-full">
								<h1 className="w-fit text-sm text-secondary-100 flex flex-row gap-1 items-center">Activity Rewards</h1>
								<div className="grow text-secondary-100 text-sm flex flex-row justify-end">
									Balance:&nbsp;<span className="text-highlight font-bold">{profile.tokens} tokens</span>
								</div>
							</div>
						</ChevronTrigger>
						<ChevronContent>
							<>
								<div className="mb-3 text-sm text-secondary-100">Complete challenges to earn tokens</div>
								<ProgressBar progress={30} className="" />
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
							</>
						</ChevronContent>
					</Chevron> */}
				</div>
			</div>
		)
	)
}
