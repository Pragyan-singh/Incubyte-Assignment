import type { Request, Response } from "express";
import * as authService from "../services/auth.service.js";
import prisma from "../utils/prisma.js";


export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required"
      });
    }

    await authService.registerUser(name, email, password);

    return res.status(201).json({
      message: "User registered successfully"
    });
  } catch (error) {
    return res.status(400).json({
      message: (error as Error).message
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const token = await authService.loginUser(email, password);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({
      message: (error as Error).message
    });
  }
};
