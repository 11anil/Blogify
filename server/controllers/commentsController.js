import prisma from "../configs/prisma.js";

// Add Comment ( Public Route , No Auth Required )
// POST /api/comment/add
export const addComment = async (req, res) => {
    try {
        const { blogId, name, content } = req.body;
        const blogData = await prisma.blog.findUnique({
            where: { id: parseInt(blogId) },
        });

        if (!blogData) {
            return res.json({ success: false, message: "Blog not found" });
        }

        await prisma.comment.create({
            data: {
                blogId: parseInt(blogId),
                name,
                content,
                authorId: blogData.authorId,
            },
        });
        res.json({ success: true, message: "Comment added for review" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get Blog Approved Comments ( Public Route , No Auth Required )
// GET /api/comment/blog/:blogId
export const getBlogApprovedComments = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await prisma.comment.findMany({
            where: { blogId: parseInt(blogId), isApproved: true },
            orderBy: { createdAt: "desc" },
        });
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get Author Comments ( Private Route , Auth Required )
// GET /api/comment/author
export const getAuthorComments = async (req, res) => {
    try {
        const userId = req.userId;
        const isAdmin = req.isAdmin;
        const query = isAdmin ? {} : { authorId: userId };

        const comments = await prisma.comment.findMany({
            where: query,
            include: { blog: true },
            orderBy: { createdAt: "desc" },
        });

        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Approve Comment By Id ( Private Route , Auth Required )
// PUT /api/comment/approve/:commentId
export const approveCommentById = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.userId;
        const isAdmin = req.isAdmin;

        const query = isAdmin ? { id: parseInt(commentId) } : { id: parseInt(commentId), authorId: userId };

        const comment = await prisma.comment.findUnique({
            where: query,
        });

        if (!comment) {
            return res.json({ success: false, message: "Comment not found or not authorized" });
        }

        await prisma.comment.update({
            where: { id: parseInt(commentId) },
            data: { isApproved: true },
        });
        res.json({ success: true, message: "Comment approved successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Delete Comment By Id ( Private Route , Auth Required )
// DELETE /api/comment/:commentId
export const deleteCommentById = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.userId;
        const isAdmin = req.isAdmin;

        const query = isAdmin ? { id: parseInt(commentId) } : { id: parseInt(commentId), authorId: userId };

        const comment = await prisma.comment.findUnique({
            where: query,
        });

        if (!comment) {
            return res.json({ success: false, message: "Comment not found or not authorized" });
        }

        await prisma.comment.delete({
            where: { id: parseInt(commentId) },
        });
        res.json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
