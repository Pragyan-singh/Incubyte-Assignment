import { Router } from "express";
import {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet
} from "../controllers/sweet.controller.js";
//import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";
import {
  purchaseSweet,
  restockSweet
} from "../controllers/inventory.controller.js";

const router = Router();

//router.use(authenticate);

router.post("/:id/purchase", purchaseSweet);
router.post("/:id/restock", requireAdmin, restockSweet);
router.post("/", createSweet);
router.get("/", getAllSweets);
router.get("/search", searchSweets);
router.put("/:id", updateSweet);
router.delete("/:id", requireAdmin, deleteSweet);

export default router;
