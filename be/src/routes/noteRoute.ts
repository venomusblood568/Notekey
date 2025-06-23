import express from "express";
import { getNotes } from "../controller/getNotes";
import {createNotes} from "../controller/createNotes";
import {deleteNote} from "../controller/deleteNotes";
const router = express.Router();

// @ts-ignore
router.get("/get-notes",getNotes);
// @ts-ignore
router.post("/post-notes",createNotes);
// @ts-ignore
router.delete("/delete-note/:id", deleteNote);

export default router;