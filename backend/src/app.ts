import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import sweetRoutes from "./routes/sweet.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";

const app = express();

// global middleware FIRST
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);
app.use("/api/inventory", inventoryRoutes);
app.get("/", (_req, res) => {
  res.json({ status: "Sweet Shop API is running" });
});


export default app;
