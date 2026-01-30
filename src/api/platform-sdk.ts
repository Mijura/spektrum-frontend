import { PlatfromSDK } from "@jigjoy-io/platform-sdk"

const JIGJOY_API_ENDPOINT = process.env.JIGJOY_API_ENDPOINT || ""

const jigjoyClient = new PlatfromSDK(`${JIGJOY_API_ENDPOINT}`)
export default jigjoyClient