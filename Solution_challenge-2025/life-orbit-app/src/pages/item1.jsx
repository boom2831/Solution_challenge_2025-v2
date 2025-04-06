import React, { useState, useContext } from 'react';
import Header from "./header";
import Footer from "./footer";
import { DarkModeContext } from "../App";

function Item1() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-purple-50'} min-h-screen flex flex-col transition-colors duration-300`}>
      <Header />
      <main className="flex-grow px-4 py-6 mb-8">
        <ATMSimulation darkMode={darkMode} />
      </main>
      <Footer />
    </div>
  );
}

const ATMSimulation = ({ darkMode }) => {
  const [balance, setBalance] = useState(5000);
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cardInserted, setCardInserted] = useState(false);
  const [receipt, setReceipt] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const addReceiptLine = (text) => {
    setReceipt((prev) => [...prev, text].slice(-5));
  };

  const insertCard = () => {
    setError("");
    setCardInserted(true);
    addReceiptLine("Card inserted");
    setTimeout(() => {
      addReceiptLine("Please enter your PIN");
    }, 800);
  };

  const ejectCard = () => {
    setError("");
    setIsAuthenticated(false);
    setCardInserted(false);
    setPin("");
    setSelectedTransaction(null);
    addReceiptLine("Card ejected");
    setTimeout(() => {
      setReceipt([]);
    }, 1000);
  };

  const handlePinSubmit = () => {
    setError("");
    if (pin === "1234") {
      setIsAuthenticated(true);
      addReceiptLine("Welcome to Life Orbit ATM");
    } else {
      setError("Incorrect PIN. Try again.");
      setPin("");
    }
  };

  const handleTransaction = (type) => {
    setError("");
    setSelectedTransaction(type);
    setAmount("");
    if (type === 'check') {
      addReceiptLine(`Current Balance: $${balance.toFixed(2)}`);
    }
  };

  const handleSubmitTransaction = () => {
    setError("");
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount)) {
      setError("Please enter a valid amount");
      return;
    }

    if (parsedAmount <= 0) {
      setError("Amount must be positive");
      return;
    }

    setIsProcessing(true);

    if (selectedTransaction === 'withdraw') {
      if (parsedAmount > balance) {
        setError("Insufficient funds");
        setIsProcessing(false);
        return;
      }
      setTimeout(() => {
        const newBalance = balance - parsedAmount;
        setBalance(newBalance);
        addReceiptLine(`Withdrawal: -$${parsedAmount.toFixed(2)}`);
        addReceiptLine(`New Balance: $${newBalance.toFixed(2)}`);
        setAmount("");
        setIsProcessing(false);
      }, 1000);
    } else if (selectedTransaction === 'deposit') {
      setTimeout(() => {
        const newBalance = balance + parsedAmount;
        setBalance(newBalance);
        addReceiptLine(`Deposit: +$${parsedAmount.toFixed(2)}`);
        addReceiptLine(`New Balance: $${newBalance.toFixed(2)}`);
        setAmount("");
        setIsProcessing(false);
      }, 1000);
    }
  };

  return (
    <div className={`atm-simulation ${darkMode ? 'text-gray-200' : 'text-gray-800'} max-w-4xl mx-auto`}>
      <h1 className={`text-2xl font-bold text-center mb-6 ${darkMode ? "text-blue-300" : "text-blue-600"} `}>ATM Simulation</h1>
      <div className={`rounded-lg shadow p-6 mb-8 ${darkMode ? 'bg-gray-800 border-l-4 border-blue-500' : 'bg-white border-l-4 border-blue-500'}`}>
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-blue-300" : "text-blue-600"}`}>Instructions for Using an ATM</h3>
        <ul className="list-disc list-inside space-y-3 leading-relaxed">
        <li>
          <strong>💳 Insert your card:</strong> Slide your ATM card into the machine with the chip side facing up and forward.
        </li>
        <li>
          <strong>🔐 Enter your PIN:</strong> Type your 4-digit personal identification number 
          (<span className='font-medium'>1234</span> for this demo).
        </li>
        <li>
          <strong>📋 Select a transaction:</strong> Choose an option like <span className="font-medium">Withdraw</span>, <span className="font-medium">Check Balance</span>, or <span className="font-medium">Deposit</span>.
        </li>
        <li>
          <strong>🧾 Follow instructions:</strong> Read the on-screen steps carefully and proceed accordingly.
        </li>
        <li>
          <strong>✅ Take your card and receipt:</strong> Don’t forget your card, receipt, and any cash before leaving the ATM.
        </li>
      </ul>
      </div>

      <div className={`rounded-lg shadow p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Interactive ATM Simulation</h3>

        <div className={`relative rounded-xl p-6 h-120 flex flex-col items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className={`p-4 rounded-lg w-full h-48 mb-4 font-mono overflow-y-auto ${darkMode ? 'bg-black text-green-400' : 'bg-gray-800 text-green-400'}`}>
            {error ? (
              <p className="text-red-500 text-center mt-16">{error}</p>
            ) : !cardInserted ? (
              <p className="text-center mt-16">Please insert your card</p>
            ) : !isAuthenticated ? (
              <div className="text-center mt-16">
                <p>Enter your PIN</p>
                <div className="flex justify-center mt-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i} className={`mx-1 w-4 h-4 rounded-full ${pin.length > i ? 'bg-green-500' : 'bg-green-500 opacity-50'}`}></span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-2">
                <p>Welcome to Life Orbit ATM</p>
                <p className="mt-2">Balance: ${balance.toFixed(2)}</p>
              </div>
            )}
          </div>

          <div className={`rounded-lg shadow p-6 m-2 w-full ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
            {!isAuthenticated ? (
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder={cardInserted ? "Enter PIN (1234)" : "Insert card first"}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className={`border p-2 rounded-md w-full text-center ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} ${!cardInserted ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  maxLength="4"
                  disabled={!cardInserted}
                />
                <button
                  onClick={handlePinSubmit}
                  className={`px-4 py-2 rounded-md w-full transition ${!cardInserted ? 'bg-gray-400 cursor-not-allowed' : darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                  disabled={!cardInserted}
                >
                  Submit
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <button onClick={() => handleTransaction('withdraw')} className={`flex-1 px-4 py-2 rounded-md transition ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}>Withdraw</button>
                  <button onClick={() => handleTransaction('deposit')} className={`flex-1 px-4 py-2 rounded-md transition ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}>Deposit</button>
                  <button onClick={() => handleTransaction('check')} className={`flex-1 px-4 py-2 rounded-md transition ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>Check Balance</button>
                </div>
                {(selectedTransaction === 'withdraw' || selectedTransaction === 'deposit') && (
                  <>
                    <input
                      type="number"
                      placeholder={`Enter amount to ${selectedTransaction}`}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                      className={`border p-2 rounded-md w-full text-center ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                    />
                    <button
                      onClick={handleSubmitTransaction}
                      disabled={isProcessing}
                      className={`px-4 py-2 rounded-md w-full transition ${isProcessing ? 'bg-gray-400' : darkMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'} text-white`}
                    >
                      {isProcessing ? 'Processing...' : 'Submit'}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="relative w-64 h-16 bg-gray-400 rounded-lg flex justify-center items-center m-5">
            {!cardInserted ? (
              <button
                onClick={insertCard}
                className={`absolute -left-16 w-16 h-10 rounded-l-lg flex items-center justify-center text-white animate-bounce ${darkMode ? 'bg-blue-700' : 'bg-blue-600'}`}
              >
                <span className="transform rotate-90">Card</span>
              </button>
            ) : (
              <button
                onClick={ejectCard}
                className={`w-16 h-10 rounded-lg text-white ${darkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                Eject
              </button>
            )}
          </div>

          <div className={`absolute right-4 bottom-4 w-32 h-48 p-2 overflow-y-auto text-xs ${darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-800'}`}>
            <p className="font-bold mb-2 border-b">Receipt:</p>
            {receipt.map((line, i) => (
              <p key={i} className="mb-1 border-b border-gray-400">{line}</p>
            ))}
          </div>
        </div>
      </div>

      <div className={`rounded-lg shadow p-6 mt-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>ATM Tutorial Video</h3>
        <div className="aspect-w-16 aspect-h-9 w-full">
          <iframe
            className="w-full h-96 rounded-lg"
            src="https://www.youtube.com/embed/XkY6xHwZ1yA"
            title="ATM Usage Tutorial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className={`mt-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Watch this tutorial to learn more about using ATMs safely and effectively.
        </p>
      </div>
    </div>
  );
};

export default Item1;
