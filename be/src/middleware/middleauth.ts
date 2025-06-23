// middleware/auth.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET;

export const middlewareAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as { id: string };
    (req as any).user = { userId: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};
