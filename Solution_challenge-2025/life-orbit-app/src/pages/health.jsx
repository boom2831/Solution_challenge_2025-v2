import { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";

function Health() {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const storedLike = localStorage.getItem("like_2fa");
    if (storedLike === "true") {
      setLiked(true);
    }
  }, []);

  const toggleLike = () => {
    const newLike = !liked;
    setLiked(newLike);
    localStorage.setItem("like_2fa", newLike);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-6">
        <h1 className="text-3xl font-[Arial] font-bold text-emerald-500 mb-6 tracking-wide drop-shadow-sm">
          Security
        </h1>

        {/* Course Container */}
        <div className="bg-emerald-100 p-6 rounded-xl shadow-lg w-full">
          <h2 className="text-lg font-bold font-[Arial] text-black-900 mb-4">Available Courses</h2>

          {/* 2FA Course */}
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 shadow-sm hover:ring-2 hover:ring-amber-400 transition mb-4 w-full relative">
            <p className="text-black-900 font-semibold font-[Arial]">
              Email Security Using 2-Factor Authentication
            </p>
            <p className="text-black-700 text-sm mt-2 font-[Arial]">
              Learn how to secure email accounts using 2-Factor Authentication (2FA) and protect against unauthorized access.
            </p>
            
            {/* Like Button */}
            <button
              onClick={toggleLike}
              className={`absolute top-3 right-4 text-xl transition-transform duration-300 ${
                liked ? "text-red-500 scale-110" : "text-gray-400 hover:scale-110"
              }`}
            >
              {liked ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Health;
