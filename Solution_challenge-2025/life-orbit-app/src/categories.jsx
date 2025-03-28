import { useState } from "react";
import Header from "./header";
import Footer from "./footer";

function Categories() {
  // State for categories
  const [categories, setCategories] = useState([
    { name: "Finance", colorFrom: "from-green-500", colorTo: "to-green-700" },
    { name: "Health & Wellness", colorFrom: "from-blue-500", colorTo: "to-blue-700" },
  ]);

  // Function for button click (does nothing for now)
  const handleButtonClick = () => {
    console.log("Button clicked!"); // You can add functionality later
  };

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
              <span className="text-lg font-bold text-gray-800">Categories</span>
            </div>
            {/* Button that does nothing */}
            <button 
              className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700"
              onClick={handleButtonClick}
            >
            </button>
          </div>

          {/* Grid Items - Render Only If Categories Exist */}
          {categories.length > 0 && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`w-full h-32 bg-gradient-to-r ${category.colorFrom} ${category.colorTo} rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-lg`}
                >
                  {category.name}
                </div>
              ))}
            </div>
          )}
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

    