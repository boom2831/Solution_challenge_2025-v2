import { Link } from "react-router-dom";

const navItems = [
    { path: "/", icon: "home_icon.ico", alt: "Home" },
    { path: "/categories", icon: "Search_icon.ico", alt: "Search" },
    { path: "#", icon: "heart_icon.ico", alt: "Favorites" },
    { path: "#", icon: "profile_icon.ico", alt: "Profile" },
];

function Footer() {
    return (
        <footer className="fixed bottom-0 w-full flex justify-around items-center bg-white p-3 shadow rounded-t-2xl dark:bg-gray-800">
            {navItems.map((item, index) => (
                <Link key={index} to={item.path} className="text-xl text-gray-700 dark:text-gray-300">
                    <img src={item.icon} className="h-8 w-8" alt={item.alt} />
                </Link>
            ))}
        </footer>
    );
}

export default Footer;
