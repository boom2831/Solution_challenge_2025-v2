import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "./App";

const sampleData = [
  { keyword: "ATM", path: "/finance" },
  { keyword: "Cheque writing", path: "/finance" },
  { keyword: "2 factor authentication", path: "/health" }
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const handleSearch = (searchText) => {
    const lowerSearch = searchText.toLowerCase();
    const match = sampleData.find((item) =>
      lowerSearch.includes(item.keyword.toLowerCase())
    );

    if (match) {
      navigate(match.path);
      setFilteredSuggestions([]);
    } else {
      alert("No matching page found.");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const lowerValue = value.toLowerCase();
    const suggestions = sampleData.filter((item) =>
      item.keyword.toLowerCase().includes(lowerValue)
    );
    setFilteredSuggestions(suggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.keyword);
    handleSearch(suggestion.keyword);
  };

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
      setQuery(transcript);
      handleSearch(transcript);
    };

    recognition.start();
  };

  return (
    <div className="relative w-full md:w-3/5">
      <div
        className={`flex items-center rounded-full px-2 md:px-4 py-1 md:py-2 ${
          darkMode ? "bg-gray-700" : "bg-gray-100"
        }`}
      >
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
          className={`bg-transparent w-[85%] outline-none px-2 md:px-4 placeholder-gray-400 ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}
        />

        <button
          onClick={() => handleSearch(query)}
          className="text-gray-500 ml-1 md:ml-2 mr-1 md:mr-2 hover:scale-110 hover:p-1 hover:shadow-xl hover:rounded-full hover:shadow-blue-400/50"
        >
          <img className="h-5 w-6 md:h-6 md:w-8" src="search-icon.ico" alt="Search" />
        </button>

        <button
          onClick={startListening}
          className={`text-gray-500 hover:scale-110 ml-2 md:ml-4 mr-2 md:mr-4 transition-transform ${
            darkMode ? "dark:text-gray-300" : ""
          } ${isListening ? "animate-pulse" : ""}`}
        >
          <img
            className="h-5 w-6 md:h-6 md:w-8 hover:scale-110 hover:shadow-xl hover:rounded-full hover:shadow-blue-400/50"
            src="microphone.ico"
            alt="Microphone"
          />
        </button>
      </div>

      {filteredSuggestions.length > 0 && (
        <ul
          className={`absolute z-10 mt-2 w-full rounded-md shadow-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          }`}
        >
          {filteredSuggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(item)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600"
            >
              {item.keyword}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
