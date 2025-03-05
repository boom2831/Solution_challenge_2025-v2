function Categories() {
    return (
      <div className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen flex flex-col items-center">
        {/* Header */}
        <div className="w-full bg-blue-500 flex items-center justify-between px-6 py-4 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-md">
              <img src="path-to-icon" alt="Icon" className="w-10 h-10" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="bg-white rounded-full px-6 py-2 text-sm shadow focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="text-yellow-300 font-extrabold text-2xl">Life Orbit</div>
        </div>
  
        {/* Categories Section */}
        <div className="w-full max-w-5xl bg-blue-100 p-6 mt-6 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M3 6h18m-7 8h7m-7 4h7"
                  />
                </svg>
              </button>
              <span className="text-lg font-bold text-gray-800">Categories</span>
            </div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="toggle-checkbox" />
              <span className="text-lg font-bold text-gray-800">Toggle</span>
            </label>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="w-full h-32 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg"></div>
            ))}
          </div>
        </div>
  
        {/* Citations Section */}
        <div className="w-full max-w-5xl bg-blue-100 p-6 mt-6 rounded-2xl shadow-md">
          <span className="text-lg font-bold text-gray-800">Citations</span>
        </div>
  
        {/* Footer */}
        <div className="w-full max-w-5xl flex justify-around items-center bg-blue-500 p-6 mt-6 rounded-2xl shadow-lg">
          {[...Array(4)].map((_, index) => (
            <button
              key={index}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-100"
            >
              <svg
                className="w-7 h-7 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M3 6h18m-7 8h7m-7 4h7"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  export default Categories;
  