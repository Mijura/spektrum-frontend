import { useRef, useState } from "react"
import { useUserData } from "../hooks/store"
import { Button, Copyable, Input, Modal, ModalContent, ModalTrigger } from "@jigjoy-ai/ui-library"
import { createApiKey } from "../api/account-and-billing"
import { useDispatch } from "react-redux"
import { apiKeyCreated } from "../reducers/account-reducer"
import { ApiKey } from "@jigjoy-ai/spektrum-client"

export default function ApiKeysPage() {
	const userData = useUserData()
	const [apiKeyName, setApiKeyName] = useState("")
	const [rawApiKey, setRawApiKey] = useState("")
	const apiKeyNameRef = useRef<HTMLInputElement>(null)
	const [apiKeyCreationModalOpened, setApiKeyCreationModalOpened] = useState(false)
	const [isExecuting, setIsExecuting] = useState(false)
	const dispatch = useDispatch()

	const handleCreateApiKey = async () => {
		setIsExecuting(true)
		try {
			const apiKey: ApiKey = await createApiKey(apiKeyName)
			dispatch(apiKeyCreated(apiKey))
			setApiKeyCreationModalOpened(false)
			setApiKeyName("")
			setRawApiKey(apiKey.rawKey as string)
		} finally {
			setIsExecuting(false)
		}
	}

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
						<div className="h-full w-full xl:w-2/3 2xl:w-1/2 rounded-sm justify-center items-center mx-auto mt-20">
							<h1 className="text-2xl font-bold text-secondary-100 mb-4">API keys</h1>
							<hr className="border-secondary-200" />

							<div className="flex flex-col gap-4 mt-8">
								<div className="flex flex-col gap-2">
									<div className="text-secondary-100">
										You are authorized to access and control all API keys for this organization.
									</div>
									<div className="text-secondary-100">
										Keep your API keys private and never include them in browser-based or
										client-side code. If a key is exposed publicly, JigJoy may deactivate it to
										maintain account security.
									</div>

									<div className="flex flex-row w-full items-center mt-10">
										{rawApiKey && (
											<Copyable
												className="w-fit"
												text={rawApiKey}
												tooltipMessage="Copy — this won’t be shown again."
											/>
										)}
										<div className="grow flex justify-end h-fit">
											<Button
												className="bg-highlight text-primary hover:bg-highlight/80 w-fit mt-4"
												onClick={() => setApiKeyCreationModalOpened(true)}
											>
												Create API Key
											</Button>
										</div>
									</div>

									{userData.apiKeys.length === 0 ? (
										<>
											<div className="mt-4 text-secondary bg-surface-light p-4 rounded-md">
												No API keys yet.
											</div>
										</>
									) : (
										<div className="w-full">
											<div className="flex flex-row w-full gap-2">
												<p className="text-sm text-highlight-200 p-4 rounded-md w-1/3">Name</p>
												<p className="text-sm text-highlight-200 p-4 rounded-md w-2/3">
													API Key
												</p>
											</div>
											{userData.apiKeys.map((apiKey: any) => (
												<div className="flex flex-col py-1 gap-2">
													<div className="flex flex-row w-full gap-2">
														<p className="text-sm text-secondary-100 bg-surface-light p-2 rounded-md w-1/3">
															{apiKey.name}
														</p>
														<p className="text-sm text-secondary-100 bg-surface-light p-2 rounded-md w-2/3">
															{apiKey.displayKey}
														</p>
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-row w-[300px] h-fit z-40">
				<Modal
					isOpen={apiKeyCreationModalOpened}
					onOpenCallback={() => {
						// Focus the input when modal opens
						setTimeout(() => {
							apiKeyNameRef.current?.focus()
						}, 200)
					}}
					onCloseCallback={() => setApiKeyCreationModalOpened(false)}
				>
					<ModalTrigger>
						<div
							style={{ display: "none" }}
							ref={(el) => {
								if (el && apiKeyCreationModalOpened) {
									el.click()
								}
							}}
						/>
					</ModalTrigger>
					<ModalContent title="New task" className="w-full xl:w-[600px] max-w-[90vw]">
						<Input
							ref={apiKeyNameRef}
							placeholder="API key name"
							value={apiKeyName}
							onChange={(e) => setApiKeyName(e.target.value)}
							className="mb-4 w-full"
						/>
						<div className="flex justify-end gap-2">
							<Button
								size="sm"
								className="bg-highlight text-primary hover:bg-highlight/80 w-fit"
								onClick={handleCreateApiKey}
								loading={isExecuting}
							>
								Create API Key
							</Button>
						</div>
					</ModalContent>
				</Modal>
			</div>
		</div>
	)
}
