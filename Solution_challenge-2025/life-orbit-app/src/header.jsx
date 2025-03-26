import { useState, useEffect } from "react";
import SearchBar from "./searchbar";

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow dark:bg-gray-800">
      {/* Logo */}
      <div className="flex items-center">
        <img src="Logo.ico" alt="Life Orbit Logo" className="w-10 h-10 rounded-full" />
        <h1 className="ml-2 text-lg font-bold text-yellow-600 dark:text-yellow-400">Life Orbit</h1>
      </div>

      {/* Search Bar */}
      <SearchBar/>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        <button className="p-1 hover:scale-110 hover:shadow-xl hover:rounded-full hover:shadow-blue-400/50 transition-all duration-300 ease-in-out">
          <img src="translator-icon.png" className="h-10 w-10" alt="Translator" />
        </button>

       {/* Dark Mode Toggle */}
        <label className="relative inline-flex items-center cursor-pointer">
            <input
            type="checkbox"
            className="sr-only peer"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            />
            <div
            className="w-12 h-6 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden hover:shadow-blue-400/50
            before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center 
            before:content-['☀️'] before:absolute before:h-5 before:w-5 before:top-1/2 before:bg-white before:rounded-full 
            before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 
            peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full 
            shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] 
            after:content-['🌙'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-0.5 after:right-1 
            after:translate-y-0 after:w-5 after:h-5 after:opacity-0 after:transition-all after:duration-700 
            peer-checked:after:opacity-100 peer-checked:after:rotate-90 peer-checked:after:translate-y-0"
            ></div>
        </label>
      </div>
    </header>
  );
};

export default Header;
