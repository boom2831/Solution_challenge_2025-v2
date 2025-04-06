// footer.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../App";

const navItems = [
    { path: "/home", icon: "home_icon.ico", alt: "Home" },
    { path: "/categories", icon: "Search_icon.ico", alt: "Search" },
    { path: "/profile", icon: "heart_icon.ico", alt: "Favorites" },
    { path: "/profile", icon: "profile_icon.ico", alt: "Profile" },
];

function Footer() {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <footer className="w-full dark:bg-gray-800 py-2 shadow-lg fixed bottom-0 flex justify-around items-center bg-white p-2 rounded-t-2xl">
            {navItems.map((item, index) => (
                <Link 
                    key={index} 
                    to={item.path} 
                    className={`p-1.5 rounded-full ${darkMode ? "hover:shadow-gray-600/30" : "hover:shadow-blue-400/30"} hover:shadow-md`}
                >
                    <img 
                        src={item.icon} 
                        className="h-5 w-5 md:h-6 md:w-6 hover:scale-110 transition-transform" 
                        alt={item.alt} 
                    />
                </Link>
            ))}
        </footer>
    );
}

export default Footer;
