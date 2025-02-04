import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EditorState } from "./editor-types"
import Project from "../types/project"

const defaultFiles = {
	"/src/index.css": `
@import "tailwindcss";
	`,
	"/src/index.tsx": `
	import React, { StrictMode } from "react";
  	import { createRoot } from "react-dom/client";
  	import App from "./App";
	import "./index.css"; 

  const root = createRoot(document.getElementById("root"));
  root.render(
	<StrictMode>
	  <App />
	</StrictMode>
  );`,
	"/package.json": `{
	"name": "project",
	"private": true,
	"scripts": {
		"start": "rspack serve --config configs/rspack.dev.js",
		"serve": "rspack serve --config configs/rspack.dev.js"
	},
	"dependencies": {
	  "react": "^18.0.0",
	  "react-dom": "^18.0.0",
	  "react-scripts": "^4.0.0",
	  "postcss": "^8.4.38",
	  "@tailwindcss/postcss": "^4.0.0-alpha.13",
	  "tailwindcss": "^4.0.0"
	},
	"devDependencies": {
		"@rspack/cli": "^1.0.14",
		"@rspack/core": "^1.0.14",
		"@rspack/dev-server": "^1.0.9",
		"@tanstack/router-cli": "^1.92.11",
		"@tanstack/router-devtools": "^1.92.11",
		"@tanstack/router-plugin": "^1.92.11",
		"@types/node": "^20.12.12",
		"@types/react": "^19.0.7",
		"@types/react-dom": "^19.0.3",
		"css-loader": "^7.1.1",
		"dotenv-webpack": "^8.1.0",
		"style-loader": "^4.0.0",
		"typescript": "^5.4.5",
		"webpack-merge": "^6.0.1"
	}
  }
  `,
	"src/App.tsx": `
export default function App() {
	return (
	<div className="text-pink-500">
Hello world
	</div>

	);
}

`,
}
let initialState: EditorState = {
	project: {
		id: "1bf60676-3a75-41cb-9379-3fa320a162c9",
		name: "My First project",
		description: "This is my first project built with JigJoy",
		imageUrl: "https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/257aacc0-f677-4133-8732-b0d44e8ff4ef/look_after.gif",
		sourceCode: defaultFiles,
		chatHistory: [
			{
				id: 1,
				role: "system",
				content: `I'm here to help you create your app! Give me instructions, and I will start creating.`,
			},
		],
	},
}

export const editorSlice = createSlice({
	name: "editor",
	initialState,

	reducers: {
		projectUpdated: (state, action: PayloadAction<Project>) => {
			state.project = action.payload
		},

		messageAdded: (state, action: PayloadAction<any>) => {
			state.project.chatHistory.push(action.payload)
		},

		sourceCodeUpdated: (state, action: PayloadAction<any>) => {
			state.project.sourceCode = action.payload
		},
	},
})

export const { projectUpdated, messageAdded, sourceCodeUpdated } = editorSlice.actions

export default editorSlice.reducer
