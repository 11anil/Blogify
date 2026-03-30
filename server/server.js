import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import blogRouter from "./routes/blogRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import userRouter from "./routes/userRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";

const app = express();

connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Request Logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Routes
app.get("/", (req, res) => res.send("API is Working"));
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);
app.use("/api/user", userRouter);
app.use("/api/ai", aiRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("GLOBAL ERROR:", err.stack);
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
});

export default app;
