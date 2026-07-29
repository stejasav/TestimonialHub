import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./config/db.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

connectDB();

const app = express();

// Security & Logging Middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api/testimonials", testimonialRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Centralized Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});