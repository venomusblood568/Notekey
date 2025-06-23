import { Request, Response } from "express";
import Note from "../models/notes";

// @ts-ignore
interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

export const deleteNotes = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ message: "Server error" });
  }
};
