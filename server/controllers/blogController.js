import prisma from "../configs/prisma.js";
import { v2 as cloudinary } from "cloudinary";

// Add Blog ( Private Route , Auth Required )
// POST /api/blog/add
export const addBlog = async (req, res) => {
    try {
        const userId = req.userId;

        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        // Check if all fields are present
        if (!title || !description || !category || !imageFile) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        // Upload Image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
            folder: "blogs",
            resource_type: "image",
        });

        const image = uploadResult.secure_url;

        await prisma.blog.create({
            data: {
                title,
                subTitle,
                description,
                category,
                image,
                isPublished: Boolean(isPublished),
                authorId: userId,
            },
        });

        res.json({ success: true, message: "Blog added successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get All Published Blogs ( Public Route )
// GET /api/blog
export const getAllPublishedBlogs = async (req, res) => {
    try {
        const blogs = await prisma.blog.findMany({
            where: { isPublished: true },
        });
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get Published Blog By Id ( Public Route )
// GET /api/blog/:blogId
export const getPublishedBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await prisma.blog.findUnique({
            where: { id: parseInt(blogId) },
            include: { author: true },
        });
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        res.json({ success: true, blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Delete Blog By Id ( Private Route , Auth Required )
// DELETE /api/blog/:blogId
export const deleteBlogById = async (req, res) => {
    try {
        const userId = req.userId;
        const isAdmin = req.isAdmin;
        const { blogId } = req.params;

        const query = isAdmin ? { id: parseInt(blogId) } : { id: parseInt(blogId), authorId: userId };

        // Delete all comments associated with the blog
        await prisma.comment.deleteMany({
            where: { blogId: parseInt(blogId) },
        });

        await prisma.blog.delete({
            where: query,
        });

        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Toggle Publish ( Private Route , Auth Required )
// PUT /api/blog/:blogId
export const togglePublish = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.userId;
        const isAdmin = req.isAdmin;

        const query = isAdmin ? { id: parseInt(blogId) } : { id: parseInt(blogId), authorId: userId };

        const blog = await prisma.blog.findUnique({
            where: query,
        });

        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }

        await prisma.blog.update({
            where: query,
            data: { isPublished: !blog.isPublished },
        });

        res.json({ success: true, message: "Blog status updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
