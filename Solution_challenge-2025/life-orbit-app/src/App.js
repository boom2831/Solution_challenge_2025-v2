// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./pages/categories";
import Home from "./pages/home";
import Item1 from "./pages/item1";
import Profile from "./pages/profile";
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import {FirebaseProvider} from './Context/firebase'
import Security from "./pages/security"; 
import Finance from "./pages/finance";
import Item3 from './pages/item3';
import TwoFactorAuthApp from './pages/item2';

export const DarkModeContext = React.createContext();

// Custom hook to detect translation bar
function useTranslateBarOffset() {
  const [translateBarVisible, setTranslateBarVisible] = useState(false);

  useEffect(() => {
    const checkTranslateBar = () => {
      const banner = document.querySelector("#goog-gt-tt") || document.querySelector(".goog-te-banner-frame");
      setTranslateBarVisible(!!banner);
    };

    // Check once on mount
    checkTranslateBar();

    // Mutation observer for dynamic changes
    const observer = new MutationObserver(checkTranslateBar);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return translateBarVisible;
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

HEAD
  return (
<FirebaseProvider>
  <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
    <div className={darkMode ? "dark" : "light"}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/item1" element={<Item1/>} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/security" element={<Security />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/item3" element={<Item3/>} />
          <Route path="/item2" element={<TwoFactorAuthApp/>} />
        </Routes>
      </Router>
    </div>
  </DarkModeContext.Provider>
  </FirebaseProvider>


  );
}

export default App;
