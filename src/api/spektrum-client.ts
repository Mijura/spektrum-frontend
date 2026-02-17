import { SpektrumClient } from "@jigjoy-ai/spektrum-client"

const API_GATEWAY = process.env.API_GATEWAY || ""

const spektrumClient = new SpektrumClient(`${API_GATEWAY}`)
export default spektrumClient
