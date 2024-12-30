import React from 'react'
import QuestsWidget from './components/quests-widget'

function App() {
    return (
        <div className="bg-[#2F2F2F]">
            <h1 className="text-xl font-bold mb-4">Example Tabs Component</h1>
            <QuestsWidget portalTarget={document.body}>Quests</QuestsWidget>
        </div>
    )
}

export default App
