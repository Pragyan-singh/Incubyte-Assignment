import type{ Request, Response } from "express";
import * as sweetService from "../services/sweet.service.js";

export const createSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await sweetService.createSweet(req.body);
    return res.status(201).json(sweet);
  } catch (err) {
    return res.status(400).json({ message: (err as Error).message });
  }
};

export const getAllSweets = async (_: Request, res: Response) => {
  const sweets = await sweetService.getAllSweets();
  return res.status(200).json(sweets);
};

export const searchSweets = async (req: Request, res: Response) => {
  const sweets = await sweetService.searchSweets(req.query);
  return res.status(200).json(sweets);
};

export const updateSweet = async (req: Request, res: Response) => {
  const sweet = await sweetService.updateSweet(req.params.id, req.body);
  return res.status(200).json(sweet);
};

export const deleteSweet = async (req: Request, res: Response) => {
  await sweetService.deleteSweet(req.params.id);
  return res.status(204).send();
};
