// controller/createNote.ts
import { Request, Response } from "express";
import Note from "../models/notes";

export const createNotes = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. User ID missing." });
    }

    const note = new Note({
      title,
      user: userId, // Attach the user ID
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
