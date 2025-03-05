import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./categories";
import Home from "./home";
import Item from "./item";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/item" element={<Item />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/item/:id" element={<Item />} />
      </Routes>
    </Router>
  );
}

export default App;
