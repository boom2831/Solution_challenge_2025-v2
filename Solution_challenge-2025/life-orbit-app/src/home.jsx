import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Footer from "./footer"
import Header from "./header"

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
       <Header/>
  
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
      <Footer/>
  
      </div>
    );
  }
  
  export default Home;
  