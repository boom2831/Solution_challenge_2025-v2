// searchbar.jsx
import { useState, useContext } from "react";
import { DarkModeContext } from "../App";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Recognized Speech:", transcript);
      setQuery(transcript);
    };

    recognition.start();
  };

  return (
    <div
      className={`flex items-center w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] mx-auto rounded-full ${
        darkMode ? "bg-gray-700" : "bg-gray-100"
      } px-4 py-2 transition-all duration-200 ${
        darkMode ? "hover:shadow-gray-800" : "hover:shadow-gray-300"
      }`}
    >
      <input
        type="text"
        placeholder="Search..."
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`bg-transparent rounded-full px-4 py-1.5 w-full ${
          darkMode ? "text-gray-200" : "text-gray-700"
        } text-sm md:text-base focus:outline-none transition-all duration-200 ${
          darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
        }`}
      />
      <div className="flex items-center ml-4 space-x-3">
        <button
          className="text-gray-500 transition-all duration-200 hover:scale-110 active:scale-95 hover:shadow-blue-400/50"
          aria-label="Search"
        >
          <img
            className="h-6 w-6 m-1 md:h-7 md:w-7 hover:shadow-xl hover:rounded-full hover:shadow-blue-400/50" 
            src="search-icon.ico"
            alt="Search"
          />
        </button>
        <button
          className={`text-gray-500 transition-all duration-200 hover:scale-110 active:scale-95  ${
            isListening ? "animate-pulse text-red-500" : "hover:shadow-blue-400/50"
          } ${darkMode ? "dark:text-gray-300" : ""}`}
          onClick={startListening}
          aria-label="Voice search"
        >
          <img
            className="h-6 w-7 m-1 md:h-7 md:w-7 hover:shadow-xl hover:rounded-full hover:shadow-blue-400/50"  
            src="microphone.ico"
            alt="Microphone"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;