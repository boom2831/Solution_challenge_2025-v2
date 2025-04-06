import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../App";

const sampleData = [
  { keyword: "ATM", path: "/finance" },
  { keyword: "Cheque writing", path: "/finance" },
  { keyword: "2 factor authentication", path: "/security" }
];

const languageOptions = [
  { code: "en-US", name: "English (US)" },
  { code: "es-ES", name: "Spanish" },
  { code: "fr-FR", name: "French" },
  { code: "de-DE", name: "German" },
  { code: "it-IT", name: "Italian" },
  { code: "pt-BR", name: "Portuguese (Brazil)" },
  { code: "ru-RU", name: "Russian" },
  { code: "zh-CN", name: "Chinese (Mandarin)" },
  { code: "ja-JP", name: "Japanese" },
  { code: "hi-IN", name: "Hindi" },
  { code: "kn-IN", name: "Kannada" },
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
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
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = selectedLanguage;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setShowLanguageDropdown(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      alert(`Speech recognition error: ${event.error}`);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      handleSearch(transcript);
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("Failed to start recognition:", error);
      alert("Failed to start voice recognition. Please try again.");
    }
  };

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    setShowLanguageDropdown(false);
  };

  return (
    <div className="relative w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] mx-auto">
      <div
        className={`flex items-center rounded-full px-4 py-2 transition-all duration-200 ${
          darkMode ? "bg-gray-700 hover:shadow-gray-800" : "bg-gray-100 hover:shadow-gray-300"
        }`}
      >
        <input
          type="text"
          placeholder="Search..."
          aria-label="Search"
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
          className={`bg-transparent rounded-full px-4 py-1.5 w-full ${
            darkMode ? "text-gray-200 hover:bg-gray-600" : "text-gray-700 hover:bg-gray-200"
          } text-sm md:text-base focus:outline-none transition-all duration-200`}
        />
        
        <div className="flex items-center ml-4 space-x-3">
          <div className="relative">
            <button
              onClick={toggleLanguageDropdown}
              className={`text-xs px-2 py-1 rounded-md mr-2 ${
                darkMode ? "bg-gray-600 text-gray-200" : "bg-gray-200 text-gray-700"
              }`}
            >
              {languageOptions.find(lang => lang.code === selectedLanguage)?.name || "en-US"}
            </button>
            
            {showLanguageDropdown && (
              <div className={`absolute z-20 mt-1 w-40 rounded-md shadow-lg ${
                darkMode ? "bg-gray-700" : "bg-white"
              } ring-1 ring-black ring-opacity-5`}
              >
                <div className="py-1 max-h-60 overflow-auto">
                  {languageOptions.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        darkMode ? "hover:bg-gray-600 text-gray-200" : "hover:bg-gray-100 text-gray-700"
                      } ${
                        selectedLanguage === language.code ? (darkMode ? "bg-gray-600" : "bg-gray-100") : ""
                      }`}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleSearch(query)}
            className="text-gray-500 transition-all duration-200 hover:scale-110 active:scale-95 hover:shadow-blue-400/50"
            aria-label="Search"
          >
            <img
              className="h-6 w-6 m-1 md:h-7 md:w-7 hover:shadow-xl hover:rounded-full hover:shadow-blue-400/50"
              src={darkMode ? "search_white_icon.ico" : "search-icon.ico"}
              alt="Search"
            />
          </button>

          <button
            className={`text-gray-500 transition-all duration-200 hover:scale-110 active:scale-95 ${
              isListening ? "animate-pulse text-red-500" : "hover:shadow-blue-400/50"
            } ${darkMode ? "dark:text-gray-300" : ""}`}
            onClick={startListening}
            disabled={isListening}
            aria-label="Voice search"
          >
            <img
              className="h-6 w-7 m-1 md:h-7 md:w-7 hover:shadow-xl hover:rounded-full hover:shadow-blue-400/50"
              src={darkMode ? "microphone-white-icon.ico" : "microphone.ico"}
              alt="Microphone"
            />
          </button>
        </div>
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