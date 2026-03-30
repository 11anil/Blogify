import express from "express";
import { syncUser, getAuthorBlogs, getAuthorDashboard } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/sync-user", syncUser);
userRouter.get("/blogs", protect, getAuthorBlogs);
userRouter.get("/dashboard", protect, getAuthorDashboard);

export default userRouter;
