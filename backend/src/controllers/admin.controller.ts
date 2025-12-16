import { Request, Response } from "express";

export const adminDashboard = (_req: Request, res: Response) => {
  res.json({
    message: "Welcome to Admin Dashboard",
  });
};
