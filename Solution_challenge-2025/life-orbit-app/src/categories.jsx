import Header from "./header";
import Footer from "./footer";

function Categories() {
  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen flex flex-col">
      {/* Header (Fixed) */}
      <Header />

      {/* Main Content Wrapper */}
      <main className="w-full max-w-screen-lg mx-auto pt-20 px-4 flex-grow">
        {/* Categories Section */}
        <div className="bg-blue-100 p-6 rounded-2xl shadow-md">
          {/* Categories Header */}
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
          </div>

          {/* Grid Items */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Finance Category */}
            <div className="w-full h-32 bg-gradient-to-r from-green-500 to-green-700 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-lg">
              Finance
            </div>

            {/* Health & Wellness Category */}
            <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-lg">
              Health & Wellness
            </div>

            {/* Blank Cards */}
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="w-full h-32 bg-gradient-to-r from-gray-300 to-gray-400 rounded-xl shadow-lg"
              ></div>
            ))}
          </div>
        </div>

        {/* Citations Section */}
        <div className="bg-blue-100 p-6 mt-6 rounded-2xl shadow-md">
          <span className="text-lg font-bold text-gray-800">Citations</span>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Categories;

    