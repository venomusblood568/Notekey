import { Request, Response } from "express";
import Note from "../models/notes";

export const createNotes = async (req: Request, res: Response) => {
  try {
    const { title, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const note = new Note({
      title,
      user: userId,
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
