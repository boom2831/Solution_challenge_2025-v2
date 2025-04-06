import React, { useState, useEffect, useRef, useContext } from "react";
import Header from "./header";
import Footer from "./footer";
import { DarkModeContext } from "../App";

export default function TwoFactorAuthApp() {
  const { darkMode } = useContext(DarkModeContext);
  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [userInput, setUserInput] = useState(["", "", "", "", "", ""]);
  const [result, setResult] = useState("");
  const inputsRef = useRef([]);

  useEffect(() => {
    if (step === "verify") {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);
      alert("Your 2FA Code: " + code);
      console.log("Generated 2FA Code:", code);
    }
  }, [step]);

  const handleLogin = () => {
    if (email) {
      setStep("verify");
    }
  };

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newInput = [...userInput];
    newInput[index] = value;
    setUserInput(newInput);
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const verifyCode = () => {
    const code = userInput.join("");
    if (code === generatedCode) {
      setStep("success");
    } else {
      setResult("❌ Incorrect code. Try again.");
    }
  };

  const StepIndicator = ({ current }) => (
    <div className="flex justify-center gap-2 mb-4">
      {["1", "2", "3"].map((num, idx) => (
        <div
          key={idx}
          className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold ${
            parseInt(num) <= current ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
          }`}
        >
          {num}
        </div>
      ))}
    </div>
  );

  const QRCodeSection = () => (
    <div className="mt-6">
      <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">📱 Tip: Use an Authenticator App</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        You can scan the QR code below using Google Authenticator or Authy to add this account:
      </p>
      <img
        src="https://api.qrserver.com/v1/create-qr-code/?data=otpauth://totp/Example:demo@google.com?secret=JBSWY3DPEHPK3PXP&issuer=Google&size=200x200"
        alt="QR Code"
        className="mx-auto my-4"
      />
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-purple-50 text-gray-900"}`}>
      <Header />

      <main className="flex-grow px-4 py-6 mb-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <h1 className={`text-2xl font-bold text-center mb-6 ${darkMode ? "text-blue-300" : "text-blue-600"}`}>
            Two-Factor Authentication Simulation
          </h1>

          {/* 🔐 2FA Instructions Section */}
          <div className={`rounded-xl shadow-md p-6 border-l-4 border-blue-500 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h3 className={`text-2xl font-bold ${darkMode ? "text-blue-300" : "text-blue-600"} mb-4 text-center`}>
              🔐 What is 2-Step Verification (2FA)?
            </h3>
            <p className="text-sm mb-4">
              Two-Step Verification (also called 2FA) protects your Google Account by adding an extra step during sign-in. Even if someone knows your password, they won’t be able to access your account without a verification code.
            </p>

            <h2 className={`text-lg font-semibold ${darkMode ? "text-blue-300" : "text-blue-600"} mb-2`}>✅ How to Enable 2FA in Gmail</h2>
            <ol className="list-decimal list-inside text-sm mb-4 space-y-1">
              <li>
                Go to{" "}
                <a
                  className="text-blue-600 underline"
                  href="https://myaccount.google.com/security"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Account Security Settings
                </a>
              </li>
              <li>Click <strong>"2-Step Verification"</strong> and sign in again</li>
              <li>Choose your preferred verification method (text or app)</li>
              <li>Enter the 6-digit code you receive</li>
              <li>Click <strong>"Turn On"</strong> to activate it</li>
            </ol>

            <h2 className={`text-lg font-semibold ${darkMode ? "text-blue-300" : "text-blue-600"} mb-2`}>📱 Authenticator App Option</h2>
            <p className="text-sm mb-4">
              For extra security, use apps like Google Authenticator or Authy. You’ll scan a QR code and get time-based codes directly from the app.
            </p>

            <h2 className={`text-lg font-semibold ${darkMode ? "text-blue-300" : "text-blue-600"} mb-2`}>🛡 Why It’s Important</h2>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Blocks unauthorized access even if your password is stolen</li>
              <li>Keeps your emails, files, and identity safe</li>
              <li>Helps prevent phishing and account hijacking</li>
            </ul>
          </div>

          {/* 🧪 Simulation Section */}
          <div className={`rounded-xl shadow-md p-6 border-l-4 border-blue-500 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <StepIndicator current={step === "login" ? 1 : step === "verify" ? 2 : 3} />

            {step === "login" && (
              <>
                <h1 className={`text-xl font-bold mb-4 text-center ${darkMode ? "text-blue-300" : "text-blue-600"}`}>Step 1: Sign in to your Google Account</h1>
                <p className="text-sm mb-4 text-center">To begin setting up 2-Step Verification, enter your email address to simulate the login process.</p>
                <input
                  type="email"
                  placeholder="you@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 mb-4 border rounded-md text-center"
                />
                <button
                  onClick={handleLogin}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
                >
                  Continue
                </button>
              </>
            )}

            {step === "verify" && (
              <>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png"
                  alt="Security Icon"
                  className="w-16 mx-auto mb-4"
                />
                <h1 className={`text-xl font-bold ${darkMode ? "text-blue-300" : "text-blue-600"} mb-2 text-center`}>Step 2: Enter the verification code</h1>
                <p className="text-sm mb-4 text-center">Enter the 6-digit verification code displayed.</p>
                <div className="flex justify-between gap-2 mb-4">
                  {userInput.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      ref={(el) => (inputsRef.current[index] = el)}
                      className="w-10 h-12 text-2xl text-center border rounded-md"
                    />
                  ))}
                </div>
                <button
                  onClick={verifyCode}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
                >
                  Verify Code
                </button>
                {result && <div className="mt-4 font-semibold text-red-600 text-center">{result}</div>}
                <QRCodeSection />
              </>
            )}

            {step === "success" && (
              <>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                  alt="Success Icon"
                  className="w-16 mx-auto mb-4"
                />
                <h2 className={`text-2xl font-bold ${darkMode ? "text-blue-300" : "text-blue-600"} text-center`}>✅ 2-Step Verification Enabled!</h2>
                <p className="mt-2 text-center">Your Google Account is now more secure with two-factor authentication.</p>
              </>
            )}
          </div>

          {/* 📺 Tutorial Video */}
          <div className={`rounded-lg shadow p-6 mt-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-blue-300" : "text-blue-600"}`}>2-Factor Authentication Tutorial Video</h3>
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                className="w-full h-96 rounded-lg"
                src="https://www.youtube.com/embed/XkY6xHwZ1yA"
                title="2FA Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className={`mt-4 text-center ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Watch this tutorial to learn more about using 2-Factor Authentication effectively.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

