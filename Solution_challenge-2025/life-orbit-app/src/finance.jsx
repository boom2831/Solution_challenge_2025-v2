import { useState } from "react";
import Header from "./header";
import Footer from "./footer";

function Finance() {
  const [likes, setLikes] = useState({
    atm: false,
    cheque: false,
  });

  const toggleLike = (course) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [course]: !prevLikes[course],
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-6">
        <h1 className="text-3xl font-[Arial] font-bold text-cyan-500 mb-6 tracking-wide drop-shadow-sm">
          Finance
        </h1>

        {/* Course Container */}
        <div className="bg-cyan-100 p-6 rounded-xl shadow-lg w-full">
          <h2 className="text-lg font-[Arial] font-bold text-black-900 mb-4">
            Available Courses
          </h2>

          {/* ATM Course */}
          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100 shadow-sm hover:ring-2 hover:ring-amber-400 transition mb-4 w-full relative">
            <p className="text-black-900 font-semibold font-[Arial]">ATM</p>
            <p className="text-black-700 text-sm mt-2 font-[Arial]">
              Learn how to use Automated Teller Machines (ATMs) safely, withdraw
              and deposit money, check balances, and understand transaction
              limits.
            </p>
            <button
              onClick={() => toggleLike("atm")}
              className="absolute top-4 right-4 text-lg transition-transform hover:scale-125"
              aria-label="Like ATM course"
            >
              {likes.atm ? "❤️" : "🤍"}
            </button>
          </div>

          {/* Cheque Writing Course */}
          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-300 shadow-sm hover:ring-2 hover:ring-amber-400 transition w-full relative">
            <p className="text-black-900 font-semibold font-[Arial]">
              Cheque Writing
            </p>
            <p className="text-black-700 text-sm mt-2 font-[Arial]">
              Understand how to write a cheque properly, avoid mistakes,
              endorse cheques, and learn about clearing processes in banks.
            </p>
            <button
              onClick={() => toggleLike("cheque")}
              className="absolute top-4 right-4 text-lg transition-transform hover:scale-125"
              aria-label="Like Cheque Writing course"
            >
              {likes.cheque ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Finance;
