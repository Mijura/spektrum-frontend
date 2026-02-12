import { PlatformSDK } from "@jigjoy-ai/platform-sdk"

const JIGJOY_API_ENDPOINT = process.env.JIGJOY_API_ENDPOINT || ""

const jigjoyClient = new PlatformSDK(`${JIGJOY_API_ENDPOINT}`)
export default jigjoyClient
