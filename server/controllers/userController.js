import { getAuth } from "@clerk/express";
import prisma from "../configs/prisma.js";

// Sync User with Clerk ( Public Route , uses req.body for details )
// POST /api/user/sync-user
export const syncUser = async (req, res) => {
    try {
        const { userId, name, email, image } = req.body;

        if (!userId) {
            return res.json({ success: false, message: "User ID is required" });
        }

        const user = await prisma.user.upsert({
            where: { id: userId },
            update: { name, email, image },
            create: { id: userId, name, email, image },
        });

        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get All Author Blogs ( Private Route , Auth Required )
// GET /api/user/blogs
export const getAuthorBlogs = async (req, res) => {
    try {
        const userId = req.userId;
        const isAdmin = req.isAdmin;

        const blogs = await prisma.blog.findMany({
            where: isAdmin ? {} : { authorId: userId },
            orderBy: { createdAt: "desc" },
        });

        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get Author Dashboard ( Private Route , Auth Required )
// GET /api/user/dashboard
export const getAuthorDashboard = async (req, res) => {
    try {
        const userId = req.userId;
        const isAdmin = req.isAdmin;
        const query = isAdmin ? {} : { authorId: userId };

        const [recentBlogs, recentComments, blogCount, commentCount, draftCount, waitingCommentsCount] = await Promise.all([
            prisma.blog.findMany({ where: query, orderBy: { createdAt: "desc" }, take: 5 }),
            prisma.comment.findMany({ where: { ...query, isApproved: false }, orderBy: { createdAt: "desc" }, take: 5 }),
            prisma.blog.count({ where: query }),
            prisma.comment.count({ where: query }),
            prisma.blog.count({
                where: { ...query, isPublished: false },
            }),
            prisma.comment.count({
                where: { ...query, isApproved: false },
            }),
        ]);

        const dashboardData = {
            blogs: blogCount,
            comments: commentCount,
            drafts: draftCount,
            waitingComments: waitingCommentsCount,
            recentBlogs,
            recentComments,
        };

        res.json({ success: true, dashboardData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
