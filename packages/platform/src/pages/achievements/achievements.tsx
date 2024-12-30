import { useState } from "react"
import AchievementsPage from "./achievement-page"
import AchievementDetails from "./achievement-details"
import React from "react"

export default function Achievements() {
	const [selectedAchievement, setSelectedAchievement] = useState(null)

	if (selectedAchievement) {
		return <AchievementDetails achievement={selectedAchievement} onBack={() => setSelectedAchievement(null)} />
	}

	return <AchievementsPage onSelectAchievement={setSelectedAchievement} />
}
