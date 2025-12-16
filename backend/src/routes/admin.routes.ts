import { Router } from "express";
import { adminOnly } from "../middleware/adminOnly.js";
import { adminDashboard } from "../controllers/admin.controller.js";

const router = Router();

router.get("/dashboard", adminOnly, adminDashboard);

export default router;
