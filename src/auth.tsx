import * as React from "react"
import { useAuth } from "./hooks/use-auth"

export interface AuthContext {
	isAuthenticated: boolean
}

const AuthContext = React.createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const isAuthenticated = useAuth()

	return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
}
