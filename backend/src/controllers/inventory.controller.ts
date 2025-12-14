import { Request, Response } from "express";
import * as inventoryService from "../services/inventory.service.js";

export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid sweet ID" });
    }

    const sweet = await inventoryService.purchaseSweet(id);
    return res.status(200).json(sweet);
  } catch (err) {
    return res.status(400).json({ message: (err as Error).message });
  }
};

export const restockSweet = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const amount = Number(req.body.amount);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid sweet ID" });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid restock amount" });
    }

    const sweet = await inventoryService.restockSweet(id, amount);
    return res.status(200).json(sweet);
  } catch (err) {
    return res.status(400).json({ message: (err as Error).message });
  }
};
