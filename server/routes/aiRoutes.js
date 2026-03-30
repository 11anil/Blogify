import express from "express";
import { protect } from "../middleware/auth.js";
import { generateBlogDescription } from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post("/generate-description", protect, generateBlogDescription);

export default aiRouter;
