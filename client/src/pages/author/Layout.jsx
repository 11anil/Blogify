import { assets } from "../../assets/assets";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/author/Sidebar";
import { UserButton } from "@clerk/clerk-react";
import { useTheme } from "../../context/ThemeContext";

const Layout = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();

    return (
        <div className="bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen transition-all">
            <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-[var(--border-color)] bg-[var(--card-bg)]">
                <img src={theme === "light" ? assets.logo : assets.logo_light} alt="" className="w-32 sm:w-40 cursor-pointer" onClick={() => navigate("/")} />
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate("/")} className="text-sm px-4 py-2 border border-[var(--border-color)] rounded-full cursor-pointer hover:bg-[var(--bg-color)] max-sm:hidden transition-all text-[var(--text-color)]">
                        View Site
                    </button>
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
            <div className="flex h-[calc(100vh-70px)]">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
