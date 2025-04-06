// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./pages/categories";
import Home from "./pages/home";
import ChequeSimulation from "./pages/item";
import Profile from "./pages/profile";
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import {FirebaseProvider} from './Context/firebase'
import Health from "./pages/health"; 
import Finance from "./pages/finance";

export const DarkModeContext = React.createContext();

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  return (
<FirebaseProvider>
  <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
    <div className={darkMode ? "dark" : "light"}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/item" element={<ChequeSimulation />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/health" element={<Health />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Router>
    </div>
  </DarkModeContext.Provider>
  </FirebaseProvider>
  );
}

export default App;
