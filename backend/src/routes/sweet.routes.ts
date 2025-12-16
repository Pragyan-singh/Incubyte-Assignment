import { Router } from "express";
import {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
} from "../controllers/sweet.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";
import {
  purchaseSweet,
  restockSweet,
} from "../controllers/inventory.controller.js";

const router = Router();

/* ---------- PUBLIC ROUTES ---------- */
router.get("/", getAllSweets);
router.get("/search", searchSweets);

/* ---------- AUTHENTICATED ROUTES ---------- */
router.post("/:id/purchase", authenticate, purchaseSweet);

/* ---------- ADMIN ONLY ROUTES ---------- */
router.post("/", authenticate, requireAdmin, createSweet);
router.put("/:id", authenticate, requireAdmin, updateSweet);
router.delete("/:id", authenticate, requireAdmin, deleteSweet);
router.post("/:id/restock", authenticate, requireAdmin, restockSweet);

export default router;
