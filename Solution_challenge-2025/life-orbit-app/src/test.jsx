import { Search, Mic } from "lucide-react";

const SearchBar = ({ onSearch = () => {} }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.elements.namedItem("search");
    onSearch(input.value);
  };

  return (
    <div className="flex items-center gap-4 max-w-[640px] w-full bg-white">
      <form onSubmit={handleSubmit} className="flex flex-1 items-center">
        <div className="flex flex-1 items-center border border-gray-200 rounded-l-sm hover:border-blue-400 focus-within:border-blue-400">
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="w-full py-2 px-4 text-base outline-none bg-transparent"
            defaultValue=""
          />
        </div>
        <button
          type="submit"
          className="h-full px-6 py-2 bg-gray-100 border border-l-0 border-gray-200 rounded-r-sm hover:bg-gray-200"
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-gray-600" />
        </button>
      </form>

      <button
        className="p-2 hover:bg-gray-100 rounded-full"
        aria-label="Search with voice"
      >
        <Mic className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

export default SearchBar;