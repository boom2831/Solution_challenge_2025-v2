import React, { useState } from 'react';
import Header from "./header";
import Footer from "./footer";
import { DarkModeContext } from "../App";

function Item3() {
  const { darkMode } = React.useContext(DarkModeContext);

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-purple-50'} min-h-screen flex flex-col transition-colors duration-300`}>
      <Header />
      <main className="flex-grow px-4 py-6 mb-8">
        <ChequeSimulation darkMode={darkMode} />
      </main>
      <Footer />
    </div>
  );
}

const ChequeSimulation = ({ darkMode }) => {
  const [payee, setPayee] = useState('');
  const [amount, setAmount] = useState('');
  const [amountWords, setAmountWords] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [signature, setSignature] = useState('');
  const [isFilled, setIsFilled] = useState(false);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
      if (value) {
        setAmountWords(numberToWords(parseFloat(value)));
      } else {
        setAmountWords('');
      }
    }
  };

  const numberToWords = (num) => {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 
                  'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 
                'Eighty', 'Ninety'];

    if (num === 0) return 'Zero';
    if (num < 10) return units[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + units[num % 10] : '');
    
    return num.toFixed(2);
  };

  const handleSubmit = () => {
    if (payee && amount && date && signature) {
      setIsFilled(true);
    } else {
      alert('Please fill all fields');
    }
  };

  const resetCheque = () => {
    setPayee('');
    setAmount('');
    setAmountWords('');
    setDate(new Date().toLocaleDateString());
    setSignature('');
    setIsFilled(false);
  };

  return (
    <div className={`${darkMode ? 'text-white' : 'text-gray-800'}`} style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 className={`text-2xl font-bold text-center mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Cheque Writing Simulation</h1>

      {/* Instructions */}
      <div className={`mb-8 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Cheque Writing Instructions</h3>
        <ul className="list-disc pl-5 space-y-2 leading-relaxed">
        <li>✨ <strong>Be crystal clear:</strong> Write the payee's name neatly — no guesswork!</li>
        <li>💵 <strong>Double it up:</strong> Write the amount in <strong>numbers and words</strong> to avoid confusion.</li>
        <li>📅 <strong>Today's the day:</strong> Use the current date, unless you're planning ahead (post-dating).</li>
        <li>✍️ <strong>Keep it consistent:</strong> Sign the cheque just like you did at the bank — no freestyle signatures!</li>
        <li>🚫 <strong>Block tampering:</strong> Draw a line after the amount in words to prevent any sneaky edits.</li>
        <li>➕ <strong>Double cross it:</strong> Draw two parallel lines on the top left to <em>cross the cheque</em> — this makes it account-payee only, for extra safety.</li>
        <li>✅ <strong>Final check:</strong> Review everything once more before you hand it over. Peace of mind is priceless!</li>
        </ul>

      </div>

      {/* Cheque Simulation */}
      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h2 className={`text-xl font-semibold mb-4 text-center ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Practice Cheque</h2>

        {/* SVG Cheque */}
        <div className="mb-6">
          <svg width="100%" height="400px" viewBox="0 0 800 400" style={{ backgroundColor: 'white' }}>
            <rect x="10" y="10" width="780" height="380" fill="none" stroke="#333" strokeWidth="2" rx="5" ry="5" />
            <text x="20" y="40" fontFamily="Courier New" fontSize="18" fontWeight="bold">BANK OF LIFE ORBIT</text>
            <text x="20" y="70" fontFamily="Courier New" fontSize="14">123 Main Street, Reactville</text>
            <text x="650" y="40" fontFamily="Courier New" fontSize="14">Date:</text>
            <rect x="690" y="25" width="90" height="20" fill="none" stroke="#ccc" />
            <text x="695" y="40" fontFamily="Courier New" fontSize="14">{date}</text>

            <text x="20" y="110" fontFamily="Courier New" fontSize="14">Pay to the order of:</text>
            <rect x="190" y="95" width="400" height="25" fill="none" stroke="#ccc" />
            <text x="195" y="110" fontFamily="Courier New" fontSize="14" fill={payee ? '#000' : '#999'}>{payee || 'Payee Name'}</text>

            <text x="20" y="150" fontFamily="Courier New" fontSize="14">Amount: $</text>
            <rect x="100" y="135" width="150" height="25" fill="none" stroke="#ccc" />
            <text x="105" y="150" fontFamily="Courier New" fontSize="14" fill={amount ? '#000' : '#999'}>{amount || '0.00'}</text>

            <text x="20" y="190" fontFamily="Courier New" fontSize="14">In words:</text>
            <rect x="100" y="175" width="500" height="25" fill="none" stroke="#ccc" />
            <text x="105" y="190" fontFamily="Courier New" fontSize="14" fill={amountWords ? '#000' : '#999'}>{amountWords || 'Zero dollars'}</text>

            <line x1="500" y1="350" x2="700" y2="350" stroke="#333" strokeWidth="1" strokeDasharray="5,5" />
            <text x="600" y="340" fontFamily="Courier New" fontSize="14" textAnchor="middle">Authorized Signature</text>
            <text x="600" y="370" fontFamily="Courier New" fontSize="14" textAnchor="middle" fontStyle="italic" fill={signature ? '#000' : '#999'}>
              {signature || 'Your Signature'}
            </text>
          </svg>
        </div>

        {!isFilled ? (
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow`}>
            <h3 className="text-lg font-medium mb-4">Fill Out Cheque</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Payee Name:</label>
                <input
                  type="text"
                  value={payee}
                  onChange={(e) => setPayee(e.target.value)}
                  className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              <div>
                <label className="block mb-1">Amount ($):</label>
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  className={`w-32 p-2 rounded border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              <div>
                <label className="block mb-1">Date:</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`w-32 p-2 rounded border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              <div>
                <label className="block mb-1">Signature:</label>
                <input
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  className={`w-64 p-2 rounded border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
              >
                Submit Cheque
              </button>
            </div>
          </div>
        ) : (
          <div className={`p-6 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow`}>
            <h3 className="text-xl font-medium text-green-500 mb-4">Cheque Completed Successfully!</h3>
            <div className="space-y-2 mb-6">
              <p><span className="font-medium">Payee:</span> {payee}</p>
              <p><span className="font-medium">Amount:</span> ${amount} ({amountWords} dollars)</p>
              <p><span className="font-medium">Date:</span> {date}</p>
            </div>
            <button
              onClick={resetCheque}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              Write Another Cheque
            </button>
          </div>
        )}
      </div>

      {/* Video Tutorial */}
      <div className={`mt-8 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <h3 className={`text-xl font-semibold mb-4 text-left ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Cheque Writing Tutorial</h3>

        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/1A8MaWkXhBQ"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="mt-2 text-sm text-center">
          Video: How to Write a Cheque - Step by Step Guide
        </p>
      </div>
    </div>
  );
};

export default Item3;


