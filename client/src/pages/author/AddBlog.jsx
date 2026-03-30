import { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import toast from "react-hot-toast";

const AddBlog = () => {
    const { axios, fetchBlogs, navigate } = useAppContext();
    const { theme } = useTheme();
    const [isAdding, setIsAdding] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const [image, setImage] = useState(false);
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [category, setCategory] = useState("Startup");
    const [isPublished, setIsPublished] = useState(false);

    const generateAIContent = async () => {
        if (!title || !subTitle) {
            return toast.error("Please enter Title and Subtitle first");
        }
        try {
            setIsGenerating(true);
            const { data } = await axios.post("/api/ai/generate-description", { title, subTitle });
            if (data.success) {
                quillRef.current.root.innerHTML = data.description;
                toast.success("Content generated successfully");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setIsAdding(true);

            const blog = {
                title,
                subTitle,
                description: quillRef.current.root.innerHTML,
                category,
                isPublished,
            };

            const formData = new FormData();
            formData.append("blog", JSON.stringify(blog));
            formData.append("image", image);

            const { data } = await axios.post("/api/blog/add", formData);

            if (data.success) {
                toast.success(data.message);
                setImage(false);
                setTitle("");
                setSubTitle("");
                quillRef.current.root.innerHTML = "";
                setCategory("Startup");
                await fetchBlogs();
                navigate("/author");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsAdding(false);
        }
    };

    useEffect(() => {
        // Initiate Quill only once
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: "snow" });
        }
    }, []);

    return (
        <form onSubmit={onSubmitHandler} className="flex-1 bg-[var(--bg-color)] text-[var(--text-color)] h-full overflow-scroll pb-10">
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
                <p className="text-[var(--text-muted)]">Upload thumbnail</p>
                <label htmlFor="image">
                    <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className={`mt-2 h-20 rounded cursor-pointer ${theme === "dark" ? "invert opacity-80" : ""}`} />
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </label>

                <p className="mt-4 text-[var(--text-muted)]">Blog title</p>
                <input type="text" placeholder="Type here" required className="w-full max-w-xl mt-2 p-2 bg-[var(--bg-color)] border border-[var(--border-color)] text-[var(--text-color)] outline-none rounded" onChange={(e) => setTitle(e.target.value)} value={title} />

                <p className="mt-4 text-[var(--text-muted)]">Sub title</p>
                <input type="text" placeholder="Type here" required className="w-full max-w-xl mt-2 p-2 bg-[var(--bg-color)] border border-[var(--border-color)] text-[var(--text-color)] outline-none rounded" onChange={(e) => setSubTitle(e.target.value)} value={subTitle} />

                <div className="flex items-center justify-between mt-4 max-w-xl">
                    <p className="text-[var(--text-muted)]">Blog Description</p>
                    <button type="button" onClick={generateAIContent} disabled={isGenerating} className="text-xs bg-primary text-background px-3 py-1 rounded cursor-pointer hover:opacity-80 transition-all flex items-center gap-1">
                        {isGenerating ? "Generating..." : "✨ Generate with AI"}
                    </button>
                </div>
                <div className="max-w-xl h-74 pb-16 sm:pb-10 pt-2 relative">
                    <div ref={editorRef} className="bg-[var(--bg-color)] text-[var(--text-color)]"></div>
                </div>

                <p className="mt-4 text-[var(--text-muted)]">Blog category</p>
                <select onChange={(e) => setCategory(e.target.value)} value={category} name="category" className="mt-2 px-3 py-2 bg-[var(--bg-color)] border border-[var(--border-color)] text-[var(--text-muted)] outline-none rounded">
                    <option value="">Select category</option>
                    {blogCategories.map((item, index) => {
                        return (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        );
                    })}
                </select>

                <div className="flex gap-2 mt-4 items-center">
                    <p className="text-[var(--text-muted)]">Publish Now</p>
                    <input type="checkbox" checked={isPublished} className="scale-125 cursor-pointer accent-primary" onChange={(e) => setIsPublished(e.target.checked)} />
                </div>

                <button disabled={isAdding} type="submit" className="mt-8 w-40 h-10 bg-primary text-background rounded cursor-pointer text-sm font-medium shadow-sm hover:opacity-90 transition-all">
                    {isAdding ? "Adding..." : "Add Blog"}
                </button>
            </div>
        </form>
    );
};

export default AddBlog;
