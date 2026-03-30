import { useEffect, useState } from "react";
import CommentTableItem from "../../components/author/CommentTableItem";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [filter, setFilter] = useState("Not Approved");

    const { axios, isLoaded } = useAppContext();
    const { isSignedIn } = useAuth();

    const fetchComments = async () => {
        try {
            const { data } = await axios.get("/api/comment/author");
            data.success ? setComments(data.comments) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            fetchComments();
        }
    }, [isLoaded, isSignedIn]);

    return (
        <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-[var(--bg-color)]">
            <div className="flex items-center justify-between max-w-5xl">
                <p className="text-[var(--text-muted)] text-xl font-medium">All Comments</p>
                <div className="flex bg-[var(--card-bg)] border border-[var(--border-color)] rounded overflow-hidden">
                    <button onClick={() => setFilter("Approved")} className={`px-4 py-2 cursor-pointer transition-all ${filter === "Approved" ? "bg-primary text-background" : "text-[var(--text-muted)] hover:bg-[var(--bg-color)]"}`}>
                        Approved
                    </button>
                    <button onClick={() => setFilter("Not Approved")} className={`px-4 py-2 cursor-pointer transition-all ${filter === "Not Approved" ? "bg-primary text-background" : "text-[var(--text-muted)] hover:bg-[var(--bg-color)]"}`}>
                        Waiting
                    </button>
                </div>
            </div>

            <div className="relative max-w-5xl mt-10 overflow-x-auto shadow rounded-lg scrollbar-hide bg-[var(--card-bg)] border border-[var(--border-color)]">
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-xs text-[var(--text-color)] text-left uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Blog Title & Comment
                            </th>
                            <th scope="col" className="px-6 py-3 max-sm:hidden">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments
                            .filter((comment) => {
                                if (filter === "Approved") return comment.isApproved === true;
                                return comment.isApproved === false;
                            })
                            .map((comment, index) => (
                                <CommentTableItem key={comment.id} comment={comment} index={index + 1} fetchComments={fetchComments} />
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Comments;
