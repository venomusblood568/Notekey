import { Request, Response } from "express";
import Note from "../models/notes";


export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Note ID is required." });
  }

  try {
    const deleted = await Note.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Note not found." });
    }

    return res.status(200).json({ message: "Note deleted successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};
