import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./categories";
import Home from "./home";
import Item from "./item";
import SearchBar from "./test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/item" element={<Item />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/item/:id" element={<Item />} />
      </Routes>
    </Router>
  );
}

export default App;
