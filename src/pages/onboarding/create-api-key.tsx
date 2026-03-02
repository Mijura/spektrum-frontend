import { Button, Copyable } from "@jigjoy-ai/ui-library"
import { useUserData } from "../../hooks/store"
import { ApiKey } from "@jigjoy-ai/spektrum-client"
import { apiKeyCreated } from "../../reducers/account-reducer"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { createApiKey } from "../../api/account-and-billing"

export default function CreateApiKeyStep() {

	const [rawApiKey, setRawApiKey] = useState("")
	const [isExecuting, setIsExecuting] = useState(false)
	const dispatch = useDispatch()

	const handleCreateApiKey = async () => {
		setIsExecuting(true)
		try {
			const apiKey: ApiKey = await createApiKey('Onboarding API Key')
			dispatch(apiKeyCreated(apiKey))
			setRawApiKey(apiKey.rawKey as string)
		} finally {
			setIsExecuting(false)
		}
	}
    
	return 	<div className="flex flex-row w-full items-center mt-10">
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
                onClick={handleCreateApiKey}
            >
                Create API Key
            </Button>
        </div>
    </div>
}