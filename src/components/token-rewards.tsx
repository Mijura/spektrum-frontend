import CheckmarkIcon from "../shared/icons/checkmark-icon"

export default function TokenRewards() {
	return (
		<div className="flex flex-col font-body h-full">
			<div className="flex flex-col bg-surface-100 p-4 shadow-md text-white h-full">
				<div className="flex flex-row gap-3 justify-end">
					<div className="text-base">Tokens:</div>
					<div className="text-primary font-bold">100</div>
				</div>
				<h1 className="w-fit">Token Rewards</h1>

				<div className="my-3 text-sm text-base">Complete challenges to earn tokens</div>
				<div className="border-b border-[#B3F589] w-full border-[2px] rounded-[2px]"></div>
				<div className="mt-2 text-sm text-base">100% done</div>
				<div className="mt-2 flex flex-col gap-2">
					<CheckmarkIcon color="bg-primary text-white" />
				</div>
			</div>
		</div>
	)
}
