import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth, useUser } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const { getToken, isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();

    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get("/api/blog/all");
            data.success ? setBlogs(data.blogs) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Axios request interceptor to add Clerk token
    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            async (config) => {
                if (isLoaded && isSignedIn) {
                    try {
                        const token = await getToken();
                        config.headers.Authorization = `Bearer ${token}`;
                    } catch (error) {
                        console.error("Failed to get Clerk token:", error);
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Axios response interceptor to handle 401 gracefully
        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                // If it's 401 and we are not signed in or still loading, don't show toast
                if (error.response?.status === 401) {
                    if (!isSignedIn || !isLoaded) {
                        return Promise.resolve({ data: { success: false, message: "Not Authorized" } });
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [isLoaded, isSignedIn, getToken]);

    // Sync user with backend
    useEffect(() => {
        const syncUserWithBackend = async () => {
            if (isLoaded && isSignedIn && user) {
                try {
                    await axios.post("/api/user/sync-user", {
                        userId: user.id,
                        name: user.fullName,
                        email: user.primaryEmailAddress?.emailAddress,
                        image: user.imageUrl,
                    });
                } catch (error) {
                    console.error("Failed to sync user:", error);
                }
            }
        };
        syncUserWithBackend();
    }, [isLoaded, isSignedIn, user]);

    useEffect(() => {
        if (isLoaded) {
            fetchBlogs();
        }
    }, [isLoaded]);

    const value = {
        axios,
        navigate,
        blogs,
        setBlogs,
        input,
        setInput,
        fetchBlogs,
        isLoaded,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};
