import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./header";
import Footer from "./footer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
  const sliderRef = useRef(null);
  const sliderImages = ["2.jpg", "1.jpg", "3.jpg"];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: true,
    appendDots: dots => (
      <div className="absolute bottom-20 w-full z-10">
        <ul className="m-0 p-0 text-center">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-2 h-2 rounded-full bg-blue-500 opacity-50 hover:opacity-100 transition-opacity"></div>
    )
  };

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="flex-grow flex items-center justify-center pt-10 px-4 pb-4">
        <div className="box">
          <Carousel useKeyboardArrows={true}>
            {sliderImages.map((URL, index) => (
              <div className="slide" key={index}>
                <img alt={`slide-${index}`} src={URL} />
              </div>
            ))}
          </Carousel>
        </div>
      </main>

      <Footer className="fixed bottom-0 w-full z-20" />
    </div>
  );
}

export default Home;

