import { Request, Response } from "express";
import Note from "../models/notes";

// @ts-ignore
interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export const getNotes = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    // Check if user info is present
    if (!req.user || !req.user.userId) {
      res.status(401).json({ message: "Unauthorized: Missing user info" });
      return;
    }

    // Fetch notes for the authenticated user
    const notes = await Note.find({ user: req.user.userId })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(notes); // Return notes in response
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ message: "Server error" });
  }
};
