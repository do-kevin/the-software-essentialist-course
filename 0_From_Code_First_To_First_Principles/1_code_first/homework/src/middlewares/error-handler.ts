import { Response } from "express";

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    return res.status(400).json({ message: error.message });
  }
  return res.status(500).send("Internal server error");
};
