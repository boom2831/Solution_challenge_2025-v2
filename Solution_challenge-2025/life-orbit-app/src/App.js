// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./categories";
import Home from "./home";
import Item from "./item";
import Profile from "./profile";
import SignIn from './signin';
import SignUp from './signup';

export const DarkModeContext = React.createContext();

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  return (

  <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
    <div className={darkMode ? "dark" : ""}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item" element={<Item />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  </DarkModeContext.Provider>
  );
}

export default App;
