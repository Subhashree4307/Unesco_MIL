import React, { useState } from "react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
   <header className="mx-4 md:mx-8 mt-4 fixed top-0 left-0 right-0 z-50 bg-[#030303] backdrop-blur-sm rounded-lg">
  <div className=" max-w-7xl mx-auto flex items-center justify-between h-16 px-6 rounded-lg">
        <a href="/" className="text-white font-bold text-lg tracking-wide">
          MIL
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="/game" className="text-gray-300 hover:text-white transition">
            Game 
          </a>
          <a href="#Socials" className="text-gray-300 hover:text-white transition">
            Socials
          </a>
          <a href="#forums" className="text-gray-300 hover:text-white transition">
            Forums
          </a>
          <a href="uploads" className="text-gray-300 hover:text-white transition">
            Uploads
          </a>
        </nav>
        <div className="flex items-center gap-4">
          {/* Dark/Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            className={`relative w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${
              darkMode ? "bg-purple-600" : "bg-gray-700"
            }`}
          >
            <span
              className={`absolute left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                darkMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <button className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-90 transition">
            Start journey
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
