// categories.js
import { useContext } from "react";
import { DarkModeContext } from "./App";

function Categories() {
    const { darkMode } = useContext(DarkModeContext);

    return (
      <div className={`min-h-screen flex flex-col items-center ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-b from-blue-100 to-blue-300"}`}>
        {/* Header */}
        <div className={`w-full flex items-center justify-between px-4 py-3 shadow-lg ${darkMode ? "bg-gray-800" : "bg-blue-500"}`}>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md ${darkMode ? "bg-gray-700" : "bg-green-500"}`}>
              <img src="path-to-icon" alt="Icon" className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className={`rounded-full px-4 py-1 md:px-6 md:py-2 text-sm shadow focus:outline-none focus:ring ${darkMode ? "bg-gray-700 text-white focus:ring-gray-500" : "bg-white focus:ring-blue-300"}`}
            />
          </div>
          <div className={`font-extrabold text-xl md:text-2xl ${darkMode ? "text-yellow-300" : "text-yellow-300"}`}>Life Orbit</div>
        </div>
  
        {/* Categories Section */}
        <div className={`w-full max-w-5xl p-4 md:p-6 mt-4 md:mt-6 rounded-2xl shadow-md ${darkMode ? "bg-gray-800" : "bg-blue-100"}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 md:space-x-4">
              <button className={`p-2 md:p-3 rounded-full shadow-md ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-600 hover:bg-blue-700"} text-white`}>
                <svg className="w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 6h18m-7 8h7m-7 4h7" />
                </svg>
              </button>
              <span className={`text-md md:text-lg font-bold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>Categories</span>
            </div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="toggle-checkbox" />
              <span className={`text-md md:text-lg font-bold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>Toggle</span>
            </label>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className={`w-full h-24 md:h-32 rounded-xl shadow-lg ${darkMode ? "bg-gradient-to-r from-gray-700 to-gray-600" : "bg-gradient-to-r from-blue-500 to-blue-700"}`}></div>
            ))}
          </div>
        </div>
  
        {/* Citations Section */}
        <div className={`w-full max-w-5xl p-4 md:p-6 mt-4 md:mt-6 rounded-2xl shadow-md ${darkMode ? "bg-gray-800" : "bg-blue-100"}`}>
          <span className={`text-md md:text-lg font-bold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>Citations</span>
        </div>
  
        {/* Footer */}
        <div className={`w-full max-w-5xl flex justify-around items-center p-4 md:p-6 mt-4 md:mt-6 rounded-2xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-blue-500"}`}>
          {[...Array(4)].map((_, index) => (
            <button
              key={index}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"}`}
            >
              <svg
                className="w-5 h-5 md:w-7 md:h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke={darkMode ? "#D1D5DB" : "#374151"}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 6h18m-7 8h7m-7 4h7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    );
}
  
export default Categories;