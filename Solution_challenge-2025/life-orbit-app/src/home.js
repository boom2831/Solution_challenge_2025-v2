import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Home() {
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: true,
    };

    const sliderImages = [
      "22.jpg",
      "3.jpg",
      "1.jpg"
    ];
  
  
    return (
      <div className={`bg-gradient-to-b from-green-200 to-blue-300 h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between px-4 py-2 bg-white shadow dark:bg-gray-800">
          {/* Logo */}
          <div className="flex items-center">
            <img src="Logo.ico" alt="Life Orbit Logo" className="w-10 h-10 rounded-full" />
            <h1 className="ml-2 text-lg font-bold text-yellow-600 dark:text-yellow-400">Life Orbit</h1>
          </div>
          {/* Search Bar */}
          <div className="flex items-center w-3/5 bg-gray-100 px-4 py-1 m-0 rounded-full shadow-inner dark:bg-gray-700">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-gray-700 px-6 py-2 placeholder-gray-400 w-full max-w-2xl dark:text-gray-200"
            />
            <button className="text-gray-500 ml-2 mr-2 dark:text-gray-300">
              <img className="h-6 w-8" src="search-icon.ico" alt="Search" />
            </button>
            <button className="text-gray-500 ml-4 dark:text-gray-300">
              <img className="h-6 w-8" src="microphone.ico" alt="Microphone" />
            </button>
          </div>
          {/* Controls */}
          <div className="flex items-center space-x-4">
            <button className="p-1 hover:scale-110 hover:shadow-xl hover:rounded-full hover:shadow-blue-400/50 transition-all duration-300 ease-in-out">
              <img
                src="translator-icon.png"
                className="h-10 w-10"
                alt="Translator"
              />
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
  
        {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center dark:bg-gray-700 dark:text-gray-200 m-0 p-0">
        {/* Image Slider */}
        <div className="w-[90%] ">
          <Slider {...sliderSettings}>
            {sliderImages.map((image, index) => (
              <div key={index} className="w-full h-[300px]">
                <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover rounded-lg shadow-lg" />
              </div>
            ))}
          </Slider>
        </div>
      </main>
  
        {/* Bottom Navigation */}
        <footer className="fixed bottom-0 w-full flex justify-around items-center bg-white p-3 shadow rounded-t-2xl dark:bg-gray-800">
          <Link to="/" className="text-xl text-gray-700 dark:text-gray-300">
            <img src="home_icon.ico" className="h-7 w-7" alt="Home" />
          </Link>
          <Link to="/categories" className="text-xl text-gray-700 dark:text-gray-300">
            <img src="Search_icon.ico" className="h-7 w-7" alt="Search" />
          </Link>
          <button className="text-xl text-gray-700 dark:text-gray-300">
            <img src="heart_icon.ico" className="h-8 w-8" alt="Favorites" />
          </button>
          <button className="text-xl text-gray-700 dark:text-gray-300">
            <img src="profile_icon.ico" className="h-8 w-8" alt="Profile" />
          </button>
      </footer>

      </div>
    );
  }
  
  export default Home;
  