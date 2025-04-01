import { useState } from "react";
import Header from "./header";
import Footer from "./footer";

function Item() {
  const [darkMode, setDarkMode] = useState(false);
  const [balance, setBalance] = useState(5000);
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const correctPin = "1234";

  const handlePinSubmit = () => {
    if (pin === correctPin) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect PIN. Try again.");
    }
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > 0 && withdrawAmount <= balance) {
      setBalance(balance - withdrawAmount);
    } else {
      alert("Invalid amount or insufficient balance.");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark bg-gray-900" : "bg-purple-50"}`}>
      {/* Top Navigation Bar */}
      <Header />

      {/* Translator & Item Name Section */}
      <div className="p-2 flex justify-between items-center">
        <div className="flex justify-items-stretch mt-4">
          <label className="px-4 py-3 bg-white border border-gray-300 rounded-full shadow text-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 transition duration-200">
            <p>ATM Simulation</p>
          </label>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow px-2 md:px-4 py-4 md:py-6 space-y-4 md:space-y-6">
        {/* Reading Content & YouTube Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-700 font-semibold">Instructions for Using an ATM</p>
            <ul className="text-left list-disc list-inside mt-2">
              <li>Insert your ATM card into the machine.</li>
              <li>Enter your 4-digit PIN.</li>
              <li>Select a transaction: Withdraw, Check Balance, or Deposit.</li>
              <li>Follow on-screen instructions to complete your transaction.</li>
              <li>Take your receipt and card before leaving.</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-700 font-semibold">Related YouTube Video</p>
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/your_youtube_video_id"
              title="ATM Working Simulation"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* ATM Simulation Game */}
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-700 font-semibold">ATM Simulation</p>
          {!isAuthenticated ? (
            <div className="mt-4">
              <input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="border p-2 rounded-md"
              />
              <button onClick={handlePinSubmit} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
                Submit
              </button>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              <p className="text-lg font-semibold">Current Balance: ${balance}</p>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 rounded-md"
              />
              <button onClick={handleWithdraw} className="bg-red-500 text-white px-4 py-2 rounded ml-2">
                Withdraw
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <Footer />
    </div>
  );
}

export default Item;

