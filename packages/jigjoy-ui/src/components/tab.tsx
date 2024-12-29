import React from "react"
import { useState } from "react"

export default function Tab(props: any) {
	const [display, setDisplay] = useState(false)

	React.useEffect(() => {
		setDisplay(props.display)
	}, [props.display])

	return <>{display && props.children}</>
}