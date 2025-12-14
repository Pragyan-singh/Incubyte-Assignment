import { Router } from "express";
import { purchaseSweet, restockSweet } from "../controllers/inventory.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = Router();

router.use(authenticate);

// USER can purchase
router.post("/:id/purchase", purchaseSweet);

// ADMIN only can restock
router.post("/:id/restock", requireAdmin, restockSweet);

export default router;
