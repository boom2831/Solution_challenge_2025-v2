// searchbar.jsx
import { useState, useContext } from "react";
import { DarkModeContext } from "./App";

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
    <div className={`flex items-center outline-none w-full md:w-3/5 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
      <input
        type="text"
        placeholder="Search..."
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`bg-transparent rounded-full outline-none px-4 md:px-6 py-1 md:py-2 placeholder-gray-400 w-[90%] ${darkMode ? "text-gray-200" : "text-gray-700"}`}
      />
      <button className="text-gray-500 ml-1 md:ml-2 mr-1 md:mr-2 hover:scale-110 hover:p-1 hover:shadow-xl hover:rounded-full hover:shadow-blue-400/50">
        <img className="h-5 w-6 md:h-6 md:w-8" src="search-icon.ico" alt="Search" />
      </button>
      <button
        className={`text-gray-500 hover:scale-110 ml-2 md:ml-4 mr-2 md:mr-4 transition-transform ${darkMode ? "dark:text-gray-300" : ""} ${
          isListening ? "animate-pulse" : ""
        }`}
        onClick={startListening}>
        <img className="h-5 w-6 md:h-6 md:w-8 hover:scale-110 hover:shadow-xl hover:rounded-full hover:shadow-blue-400/50" src="microphone.ico" alt="Microphone" />
      </button>
    </div>
  );
};

export default SearchBar;