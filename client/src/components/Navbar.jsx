import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { isSignedIn } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex justify-between items-center py-5 sm:py-8 mx-8 sm:mx-20 xl:mx-32">
            <img onClick={() => navigate("/")} src={theme === "light" ? assets.logo : assets.logo_light} alt="logo" className="w-32 sm:w-36 cursor-pointer" />
            <div className="flex items-center gap-4 sm:gap-8">
                <button onClick={toggleTheme} className="cursor-pointer text-xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all border-none outline-none">
                    {theme === "light" ? "🌙" : "☀️"}
                </button>
                <button onClick={() => navigate("/author")} className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-background px-6 sm:px-10 py-2.5 border-none outline-none">
                    {isSignedIn ? "Dashboard" : "Login"}
                    <img src={assets.arrow} className={`w-3 ${theme === "dark" ? "invert" : ""}`} alt="arrow" />
                </button>
            </div>
        </div>
    );
};

export default Navbar;
