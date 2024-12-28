import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="z-50 w-[100%] h-[50px] bg-gray-900 text-white flex items-center justify-between shadow-md px-4">
      {/* Left Side: Logo and Navigation */}
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold cursor-pointer">Logo</div>
        <nav className="flex gap-4">
          <button className="hover:text-gray-300">Home</button>
          <button className="hover:text-gray-300">About</button>
          <button className="hover:text-gray-300">Contact</button>
        </nav>
      </div>

      {/* Right Side: Help and Profile */}
      <div className="flex items-center gap-4 relative">
        {/* Help Icon */}
        <button className="hover:text-gray-300">
          <span className="material-icons">help_outline</span>
        </button>

        {/* Profile Icon */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="hover:text-gray-300 flex items-center gap-2"
          >
            <span className="material-icons">account_circle</span>
          </button>
          
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md overflow-hidden"
              >
                <ul className="flex flex-col">
                  <li className="p-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                  <li className="p-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;