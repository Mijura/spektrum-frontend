import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectsIcon from "../icons/projects-icon";
import MarketplaceIcon from "../icons/marketplace-icon";
import AchievementsIcon from "../icons/achievements-icon";
import EditorIcon from "../icons/editor-icon";

const LeftSideMenu = () => {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [editorColor, setEditorColor] = useState("text-[#90E86F]");
  const [marketplaceColor, setMarketplaceColor] = useState("text-[#90E86F]");
  const [projectsColor, setProjectsColor] = useState("text-[#90E86F]");
  const [achievementsColor, setAchievementsColor] = useState("text-[#90E86F]");
  const [selectedOption, setSelectedOption] = useState("editor");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <motion.div
      onHoverStart={() => setMenuExpanded(true)}
      onHoverEnd={() => setMenuExpanded(false)}
      className="border-r border-r-[#4D4D4D] h-full bg-[#151515] flex flex-col shadow-lg fixed top-0 left-0 z-50 text-white"
    >
      <ul className="flex flex-col gap-2 mt-[100px]">
        <li
          className={`${
            selectedOption === "editor" ? "bg-[#252525] text-white" : "text-[#C5C5C5]"
          } hover:text-white flex cursor-pointer hover:bg-[#252525] rounded-lg m-1`}
          onMouseEnter={() => setMarketplaceColor("text-[#E5FD78]")}
          onMouseLeave={() => setMarketplaceColor("text-[#90E86F]")}
          onClick={() => handleOptionClick("editor")}
        >
          <div className="py-2 w-[72px] flex justify-center items-center">
            <EditorIcon color={selectedOption=='editor'? "text-[#B08DF8]" : editorColor} />
          </div>
          <AnimatePresence>
            {menuExpanded && (
              <motion.span
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, width: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={`mr-8 grow flex items-center`}
              >
                Editor
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        <li
          className={`${
            selectedOption === "marketplace" ? "bg-[#252525] text-white" : "text-[#C5C5C5]"
          } hover:text-white flex cursor-pointer hover:bg-[#252525] rounded-lg m-1`}
          onMouseEnter={() => setMarketplaceColor("text-[#E5FD78]")}
          onMouseLeave={() => setMarketplaceColor("text-[#90E86F]")}
          onClick={() => handleOptionClick("marketplace")}
        >
          <div className="py-2 w-[72px] flex justify-center items-center">
            <MarketplaceIcon color={selectedOption=='marketplace'? "text-[#B08DF8]" : marketplaceColor} />
          </div>
          <AnimatePresence>
            {menuExpanded && (
              <motion.span
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, width: 0, opacity: 0 }}
                transition={{ ease: "linear", duration: 0.25 }}
                className="mr-8 flex items-center"
              >
                Marketplace
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        <li
          className={`${
            selectedOption === "projects" ? "bg-[#252525] text-white" : "text-[#C5C5C5]"
          } hover:text-white flex cursor-pointer hover:bg-[#252525] rounded-lg m-1`}
          onMouseEnter={() => setProjectsColor("text-[#E5FD78]")}
          onMouseLeave={() => setProjectsColor("text-[#90E86F]")}
          onClick={() => handleOptionClick("projects")}
        >
          <div className="py-2 w-[72px] flex justify-center items-center">
            <ProjectsIcon color={selectedOption=='projects'? "text-[#B08DF8]" : projectsColor} />
          </div>
          <AnimatePresence>
            {menuExpanded && (
              <motion.span
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, width: 0, opacity: 0 }}
                transition={{ ease: "linear", duration: 0.25 }}
                className="mr-8 flex items-center"
              >
                Projects
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        <li
          className={`${
            selectedOption === "achievements" ? "bg-[#252525] text-white" : "text-[#C5C5C5]"
          } hover:text-white flex cursor-pointer hover:bg-[#252525] rounded-lg m-1`}
          onMouseEnter={() => setAchievementsColor("text-[#E5FD78]")}
          onMouseLeave={() => setAchievementsColor("text-[#90E86F]")}
          onClick={() => handleOptionClick("achievements")}
        >
          <div className="py-2 w-[72px] flex justify-center items-center">
            <AchievementsIcon color={achievementsColor} />
          </div>
          <AnimatePresence>
            {menuExpanded && (
              <motion.span
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, width: 0, opacity: 0 }}
                transition={{ ease: "linear", duration: 0.25 }}
                className="mr-8 flex items-center"
              >
                Achievements
              </motion.span>
            )}
          </AnimatePresence>
        </li>
      </ul>
    </motion.div>
  );
};

export default LeftSideMenu;
