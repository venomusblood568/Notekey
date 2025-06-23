import { Request, Response } from "express";
import Note from "../models/notes";

export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      res
        .status(400)
        .json({ message: "User ID is required as a query param." });
      return;
    }

    const notes = await Note.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ message: "Server error" });
  }
};
