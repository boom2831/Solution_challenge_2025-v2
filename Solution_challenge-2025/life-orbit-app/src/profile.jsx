import React from "react";

function Profile() {
  return (
    <div className="bg-orange-50 h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-4 py-2 bg-white shadow">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <img src="Your Land.ico" alt="Life Orbit Logo" className="w-12 h-12 rounded-full" />
          <h1 className="text-lg font-bold text-yellow-600">Life Orbit</h1>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-3/5 bg-gray-100 px-4 py-2 rounded-full shadow-inner">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-gray-700 px-6 py-2 placeholder-gray-400 w-full max-w-2xl"
          />
          <button className="text-gray-500 ml-2 mr-2">
            <img className="h-6 w-8" src="search-icon.ico" alt="Search" />
          </button>
          <button className="text-gray-500 ml-4">
            <img className="h-6 w-8" src="microphone.ico" alt="Microphone" />
          </button>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center">
          <input type="checkbox" id="toggle" className="sr-only" />
          <label htmlFor="toggle" className="inline-flex items-center cursor-pointer">
            <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner relative">
              <div className="dot w-4 h-4 bg-purple-600 rounded-full shadow transform transition"></div>
            </div>
          </label>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 py-6 space-y-6">
        {/* Profile Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Image */}
          <div className="flex items-center justify-center bg-white rounded-full shadow h-32 w-32 mx-auto md:mx-0">
            <img
              src="966-9665493_my-profile-icon-blank-profile-image-circle.png"
              alt="Profile Icon"
              className="w-32 h-32 rounded-full"
            />
          </div>
          {/* Profile Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-700 font-semibold">Profile Info</p>
          </div>
        </div>

        {/* Course Progress Section */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* Tabs */}
          <div className="flex justify-between border-b pb-2 mb-4">
            <p className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Ongoing</p>
            <p className="text-gray-600 font-semibold">Completed</p>
            <p className="text-gray-600 font-semibold">Favorites</p>
          </div>
          {/* Courses */}
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-gray-700 font-medium">Name of the course</p>
              <div className="w-1/2 bg-gray-200 h-4 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-4 rounded-full" style={{ width: "50%" }}></div>
              </div>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-gray-700 font-medium">Name of the course</p>
              <div className="w-1/2 bg-gray-200 h-4 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-4 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
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

export default Profile;

