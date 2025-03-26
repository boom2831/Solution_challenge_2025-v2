const SearchBar = () => {
    return (
      <div className="flex items-center w-3/5 bg-gray-100 px-4 py-1 rounded-full shadow-inner dark:bg-gray-700">
        <input
          type="text"
          placeholder="Search..."
          aria-label="Search"
          className="bg-transparent outline-none text-gray-700 px-6 py-2 placeholder-gray-400 w-full max-w-2xl dark:text-gray-200"
        />
        <button className="text-gray-500 ml-2 mr-2 dark:text-gray-300">
          <img className="h-6 w-8" src="search-icon.ico" alt="Search" />
        </button>
        <button className="text-gray-500 ml-4 dark:text-gray-300">
          <img className="h-6 w-8" src="microphone.ico" alt="Microphone" />
        </button>
      </div>
    );
  };
  
  export default SearchBar;
  