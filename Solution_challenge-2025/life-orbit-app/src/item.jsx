import { useState } from "react";

function Item() {
  const [speed, setSpeed] = useState(1);

  return (
    <div className="bg-purple-50 h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-4 py-2 bg-white shadow">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <img src="Your Land.ico" alt="Life Orbit Logo" className="w-12 h-12 rounded-full" />
          <h1 className="text-lg font-bold text-yellow-600">Life Orbit</h1>
        </div>
        {/* Slogan */}
        <div className="flex-1 text-center">
          <p className="text-gray-700 font-medium animate-pulse">Animated slogan</p>
        </div>

        {/* Right Section - Light/Dark Mode Toggle */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input className="sr-only peer" type="checkbox" />
          <div
            className="w-12 h-6 mr-8 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden 
            before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center 
            before:content-['☀️'] before:absolute before:h-5 before:w-5 before:top-1/2 before:bg-white before:rounded-full 
            before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 
            peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full 
            shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] 
            after:content-['🌙'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-0.5 after:right-1 
            after:translate-y-0 after:mr-8 after:w-5 after:h-5 after:opacity-0 after:transition-all after:duration-700 
            peer-checked:after:opacity-100 peer-checked:after:rotate-90 peer-checked:after:translate-y-0"
          ></div>
        </label>
        <img src="profile.png" alt="Profile Icon" className="w-12 h-10 rounded-full" />
      </header>

      {/* Translator & Item Name Section */}
      <div className="p-2 flex justify-between items-center">
        <button>
          <img src="translator-icon.png" alt="Translator Icon" className="w-12 h-12 rounded-full" />
        </button>

        <div className="flex justify-items-stretch mt-4">
          <label className="px-4 py-3 bg-white border border-gray-300 rounded-full shadow text-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 transition duration-200">
            <p>Item Name</p>
          </label>
          <button>
            <img src="speaker-icon-png.png" alt="Speaker Icon" className="absolute top-20 right-4 w-10 h-10 rounded-full" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow px-4 py-6 space-y-6">
        {/* Reading Content & YouTube Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-700 font-semibold">Reading Content</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-700 font-semibold">YouTube Video</p>
          </div>
        </div>

        {/* Game Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <img src="turtle_icon.ico" className="w-6 h-6" alt="Turtle Icon" />

              {/* Range Input with Dynamic Value Display */}
              <input
                type="range"
                className="w-40"
                min="0.5"
                max="2"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
              />

              <span className="font-bold text-gray-700">{speed}x</span>
              <img src="hare_icon.ico" className="w-6 h-6" alt="Hare Icon" />
            </div>
            <div className="text-right">
              <p className="text-gray-700 mr-2.5 font-bold">Points</p>
              <p className="text-xl text-yellow-500 font-extrabold">100 ⭐</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-700 font-semibold">Game</p>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <footer className="flex justify-around items-center bg-white mb-5 mr-20 ml-20 py-3 shadow rounded-full">
        <button className="text-xl text-gray-700">
          <img src="home_icon.ico" className="h-7 w-7" alt="Home" />
        </button>
        <button className="text-xl text-gray-700">
          <img src="Search_icon.ico" className="h-7 w-7" alt="Search" />
        </button>
        <button className="text-xl text-gray-700">
          <img src="heart_icon.ico" className="h-8 w-8" alt="Favorites" />
        </button>
        <button className="text-xl text-gray-700">
          <img src="profile_icon.ico" className="h-8 w-8" alt="Profile" />
        </button>
      </footer>
    </div>
  );
}

export default Item;
