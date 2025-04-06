import { useEffect, useRef, useState } from "react";

const languages = [
  { code: "en", label: "English (US)" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "it", label: "Italian" },
  { code: "pt", label: "Portuguese (Brazil)" },
];

const LanguageDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Wait for google.translate to be ready before initializing
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        window.google &&
        window.google.translate &&
        typeof window.google.translate.TranslateElement === "function"
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
          },
          "google_translate_element"
        );
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (langCode) => {
    setSelectedLang(langCode);
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    }
    setOpen(false);
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded shadow text-sm text-gray-900 dark:text-white hover:shadow-md transition"
      >
        <span>{languages.find((l) => l.code === selectedLang)?.label}</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 max-h-60 overflow-auto bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg">
          {languages.map((lang) => (
            <div
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              className="px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {lang.label}
            </div>
          ))}
        </div>
      )}

      <div
        id="google_translate_element"
        className="absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none"
      />
    </div>
  );
};

export default LanguageDropdown;
