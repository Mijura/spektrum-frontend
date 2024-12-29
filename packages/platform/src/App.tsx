import React, { useState } from 'react'
import AchievementsPage from './pages/achievements/achievements'
import AchievementDetails from './components/achievement-details'

const App = () => {
    const [selectedAchievement, setSelectedAchievement] = useState(null)

    if (selectedAchievement) {
        return <AchievementDetails achievement={selectedAchievement} onBack={() => setSelectedAchievement(null)} />
    }

    return <AchievementsPage onSelectAchievement={setSelectedAchievement} />
}

export default App
