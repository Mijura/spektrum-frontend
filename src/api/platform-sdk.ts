import { PlatfromSDK } from "@jigjoy-io/platform-sdk"

const API_GATEWAY = process.env.API_GATEWAY || ""

const jigjoyClient = new PlatfromSDK(`${API_GATEWAY}`)

export default jigjoyClient