import { useUserData } from "../hooks/store"

export default function ApiKeysPage() {
	const userData = useUserData()

	return (
		<div className="w-full flex flex-col pl-4 bg-[#1a1a1a]">
			<div className="h-fit bg-surface w-full flex items-center justify-center border-b border-secondary-200">
				<div className="w-fit">
					<div className="px-4 w-fit min-h-[50px] h-[50px] justify-center items-center text-secondary-100 gap-3 flex flex-row"></div>
				</div>
			</div>

			<div className="flex flex-row h-full">
				<div className="w-full h-full">
					<div className="h-full flex flex-col md:flex-row overflow-y-auto custom-scrollbar">
						<div className="h-full w-full rounded-sm mx-40 mt-20">
							<h1 className="text-2xl font-bold text-secondary-100">API Keys</h1>
							<div className="flex flex-col gap-4">
								<div className="flex flex-row gap-2">
									{userData.apiKeys.length === 0 && (
										<div className="mt-8 text-secondary-100">No API keys yet.</div>
									)}
									{userData.apiKeys.map((apiKey: any) => (
										<div key={apiKey.id}>
											<h2 className="text-lg text-secondary-100">{apiKey.name}</h2>
											<p className="text-sm text-secondary-100">{apiKey.key}</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
