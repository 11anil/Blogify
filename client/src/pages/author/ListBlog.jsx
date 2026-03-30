import { useEffect, useState } from "react";
import BlogTableItem from "../../components/author/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const ListBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const { axios, isLoaded } = useAppContext();
    const { isSignedIn } = useAuth();

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get("/api/user/blogs");
            data.success ? setBlogs(data.blogs) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            fetchBlogs();
        }
    }, [isLoaded, isSignedIn]);

    return (
        <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-[var(--bg-color)]">
            <p className="text-[var(--text-muted)] text-xl font-medium">All Blogs</p>
            <div className="relative max-w-5xl mt-10 overflow-x-auto shadow rounded-lg scrollbar-hide bg-[var(--card-bg)] border border-[var(--border-color)]">
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-xs text-[var(--text-color)] text-left uppercase">
                        <tr>
                            <th scope="col" className="px-2 py-4 xl:px-6">
                                #
                            </th>
                            <th scope="col" className="px-2 py-4">
                                Blog Title
                            </th>
                            <th scope="col" className="px-2 py-4 max-sm:hidden">
                                Date
                            </th>
                            <th scope="col" className="px-2 py-4 max-sm:hidden">
                                Status
                            </th>
                            <th scope="col" className="px-2 py-4">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog, index) => {
                            return <BlogTableItem key={blog.id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1} />;
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListBlog;
