import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./categories";
import Home from "./home";
import Item from "./item";
import Profile from "./profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item" element={<Item />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </Router>
  );
}

export default App;
