import React from "react"

function App() {
	return (
		<div className="flex items-center justify-center h-screen bg-gray-800 text-gray-200">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-rose-400 mb-4">
					Welcome to the <span className="text-rose-500">Module Federation Template</span>
				</h1>
				<p className="text-xl text-gray-300">
					Powered by{" "}
					<a href="https://rspack.dev/" className="text-rose-400 underline hover:text-rose-300" target="_blank">
						Rspack
					</a>{" "}
					and{" "}
					<a href="https://tailwindcss.com/" className="text-rose-500 underline hover:text-rose-300" target="_blank">
						TailwindCSS
					</a>
					.
				</p>
				<p className="text-lg text-gray-400 mt-4">
					This repository serves as a boilerplate for building microfrontend architectures using{" "}
					<a href="https://webpack.js.org/concepts/module-federation/" className="text-rose-400 underline hover:text-rose-300" target="_blank">
						Module Federation
					</a>
					.
				</p>
			</div>
		</div>
	)
}

export default App
