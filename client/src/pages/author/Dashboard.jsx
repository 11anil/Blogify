import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../components/author/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "@clerk/clerk-react";
import { useTheme } from "../../context/ThemeContext";
import toast from "react-hot-toast";

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        waitingComments: 0,
        recentBlogs: [],
    });

    const { axios, isLoaded, navigate } = useAppContext();
    const { isSignedIn } = useAuth();
    const { theme } = useTheme();

    const fetchDashboard = async () => {
        try {
            const { data } = await axios.get("/api/user/dashboard");
            data.success ? setDashboardData(data.dashboardData) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            fetchDashboard();
        }
    }, [isLoaded, isSignedIn]);

    return (
        <div className="flex-1 p-4 md:p-10 bg-[var(--bg-color)]">
            <div className="flex flex-wrap gap-4">
                <div onClick={() => navigate("/author/list-blog")} className="flex items-center gap-4 bg-[var(--card-bg)] border border-[var(--border-color)] p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all text-[var(--text-color)]">
                    <img src={assets.dashboard_icon_1} alt="" className={theme === "dark" ? "invert opacity-80" : ""} />
                    <div>
                        <p className="text-xl font-semibold opacity-90">{dashboardData.blogs}</p>
                        <p className="opacity-60 font-light text-sm">Blogs</p>
                    </div>
                </div>

                <div onClick={() => navigate("/author/list-comment")} className="flex items-center gap-4 bg-[var(--card-bg)] border border-[var(--border-color)] p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all text-[var(--text-color)]">
                    <img src={assets.dashboard_icon_2} alt="" className={theme === "dark" ? "invert opacity-80" : ""} />
                    <div>
                        <p className="text-xl font-semibold opacity-90">{dashboardData.comments}</p>
                        <p className="opacity-60 font-light text-sm">Comments</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-[var(--card-bg)] border border-[var(--border-color)] p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all text-[var(--text-color)]">
                    <img src={assets.dashboard_icon_3} alt="" className={theme === "dark" ? "invert opacity-80" : ""} />
                    <div>
                        <p className="text-xl font-semibold opacity-90">{dashboardData.waitingComments}</p>
                        <p className="opacity-60 font-light text-sm">Waiting</p>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center gap-3 m-4 mt-6 text-[var(--text-muted)]">
                    <img src={assets.dashboard_icon_4} alt="" className={theme === "dark" ? "invert opacity-80" : ""} />
                    <p>Latest Blogs</p>
                </div>

                <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-[var(--card-bg)] border border-[var(--border-color)]">
                    <table className="w-full text-sm text-gray-500">
                        <thead className="text-xs text-gray-600 text-left uppercase">
                            <tr>
                                <th scope="col" className="px-2 py-4 xl:px-6">
                                    {" "}
                                    #{" "}
                                </th>
                                <th scope="col" className="px-2 py-4">
                                    {" "}
                                    Blog Title{" "}
                                </th>
                                <th scope="col" className="px-2 py-4 max-sm:hidden">
                                    {" "}
                                    Date{" "}
                                </th>
                                <th scope="col" className="px-2 py-4 max-sm:hidden">
                                    {" "}
                                    Status{" "}
                                </th>
                                <th scope="col" className="px-2 py-4">
                                    {" "}
                                    Actions{" "}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentBlogs.map((blog, index) => {
                                return <BlogTableItem key={blog.id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-10">
                <div className="flex items-center gap-3 m-4 text-[var(--text-muted)]">
                    <img src={assets.dashboard_icon_4} alt="" className={theme === "dark" ? "invert opacity-80" : ""} />
                    <p>Latest Waiting Comments</p>
                </div>

                <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-[var(--card-bg)] border border-[var(--border-color)]">
                    <table className="w-full text-sm text-gray-500">
                        <thead className="text-xs text-gray-600 text-left uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-4">#</th>
                                <th scope="col" className="px-6 py-4">Comment</th>
                                <th scope="col" className="px-6 py-4">Status</th>
                                <th scope="col" className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentComments?.length > 0 ? (
                                dashboardData.recentComments.map((comment, index) => (
                                    <tr key={comment.id} className="border-t border-[var(--border-color)] text-[var(--text-muted)]">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-[var(--text-color)]">{comment.name}</p>
                                            <p className="text-xs truncate max-w-xs">{comment.content}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded-full">Waiting</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => navigate("/author/list-comment")} className="text-primary hover:underline text-xs">Review</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center">No waiting comments</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
