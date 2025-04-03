// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./categories";
import Home from "./home";
import Item from "./item";
import Profile from "./profile";
import SignIn from './signin';
import SignUp from './signup';
import Health from "./health"; 
import Finance from "./finance";

export const DarkModeContext = React.createContext();

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  return (

    <Router>
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={darkMode ? "dark" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:id?" element={<Item />} />  
          <Route path="/categories" element={<Categories />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/health" element={<Health />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </div>
    </DarkModeContext.Provider>
  </Router>
  
  );
}

export default App;
