import type { Request, Response, NextFunction } from "express";
import { error } from "../utils/logger.ts";
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
};
