import { getAuth } from "@clerk/express";
import prisma from "../configs/prisma.js";

export const protect = async (req, res, next) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.json({ success: false, message: "Not Authorized" });
    }

    try {
        let user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            // This is a lazy sync. In a real app, you might use webhooks.
            // For this migration, we'll fetch user details from Clerk if needed, 
            // but for now we'll just create a placeholder or depend on the frontend 
            // sending details if we want to be more sophisticated.
            // However, the simplest is to just use what we have.
            // Let's assume we want to create the user if they don't exist.
            // We'll need their email and name which are usually in the token or we can fetch from Clerk.
            // For now, let's just use the userId and Placeholder. 
            // Better: many apps use a /sync endpoint.

            // To keep it simple and functional:
            return res.json({ success: false, message: "User not synced. Please contact support." });
        }

        req.userId = user.id;
        req.user = user;
        if (user.email === process.env.ADMIN_EMAIL) {
            req.isAdmin = true;
        } else {
            req.isAdmin = false;
        }
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
