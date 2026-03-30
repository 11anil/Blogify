import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/author/Layout";
import Dashboard from "./pages/author/Dashboard";
import AddBlog from "./pages/author/AddBlog";
import ListBlog from "./pages/author/ListBlog";
import Comments from "./pages/author/Comments";
import Login from "./components/author/Login";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

const App = () => {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return null; // Or a global loader
    }

    return (
        <div>
            <Toaster />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog/:id" element={<Blog />} />
                <Route path="/author" element={isSignedIn ? <Layout /> : <Login />}>
                    <Route index element={<Dashboard />} />
                    <Route path="add-blog" element={<AddBlog />} />
                    <Route path="list-blog" element={<ListBlog />} />
                    <Route path="list-comment" element={<Comments />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
