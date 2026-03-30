import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const Sidebar = () => {
    const { theme } = useTheme();

    return (
        <div className="flex flex-col border-r border-[var(--border-color)] bg-[var(--card-bg)] min-h-full pt-6">
            <NavLink end={true} to="/author" className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all ${isActive ? "bg-primary text-background border-r-4 border-primary" : "text-[var(--text-muted)] hover:bg-[var(--bg-color)]"}`}>
                <img src={assets.home_icon} alt="" className={`min-w-4 w-5 ${theme === "dark" ? "invert opacity-80" : ""}`} />
                <p className="hidden md:inline-block">Dashboard</p>
            </NavLink>

            <NavLink to="/author/add-blog" className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all ${isActive ? "bg-primary text-background border-r-4 border-primary" : "text-[var(--text-muted)] hover:bg-[var(--bg-color)]"}`}>
                <img src={assets.add_icon} alt="" className={`min-w-4 w-5 ${theme === "dark" ? "invert opacity-80" : ""}`} />
                <p className="hidden md:inline-block">Add blogs</p>
            </NavLink>

            <NavLink to="/author/list-blog" className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all ${isActive ? "bg-primary text-background border-r-4 border-primary" : "text-[var(--text-muted)] hover:bg-[var(--bg-color)]"}`}>
                <img src={assets.list_icon} alt="" className={`min-w-4 w-5 ${theme === "dark" ? "invert opacity-80" : ""}`} />
                <p className="hidden md:inline-block">Blog lists</p>
            </NavLink>

            <NavLink to="/author/list-comment" className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all ${isActive ? "bg-primary text-background border-r-4 border-primary" : "text-[var(--text-muted)] hover:bg-[var(--bg-color)]"}`}>
                <img src={assets.comment_icon} alt="" className={`min-w-4 w-5 ${theme === "dark" ? "invert opacity-80" : ""}`} />
                <p className="hidden md:inline-block">Comments</p>
            </NavLink>
        </div>
    );
};

export default Sidebar;
