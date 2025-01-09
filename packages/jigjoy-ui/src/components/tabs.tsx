import React, { useState } from 'react'

export default function Tabs(props: any) {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <div className="h-full w-full max-h-full">
            {/* Tab Buttons */}
            <div className="flex items-end -mb-px gap-1">
                {React.Children.map(props.children, (child, index) => {
                    const isActive = index === activeTab
                    return (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`
                                relative px-4 py-2 text-sm font-medium
                                transition-colors duration-300
                                rounded-t-md
                                outline-none
                                ${
                                    isActive
                                        ? 'bg-[#6B5A8E] text-white'
                                        : 'text-clickable bg-surface1 hover:bg-hover hover:text-black'
                                }
                            `}
                        >
                            {child.key}
                        </button>
                    )
                })}
            </div>

            {/* Tab Content */}
            <div className="border border-surface3 rounded-b-md h-full">
                {React.Children.map(props.children, (child, index) =>
                    React.cloneElement(child, { display: activeTab === index })
                )}
            </div>
        </div>
    )
}
