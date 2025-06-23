import express from "express";
import { getNotes } from "../controller/getNotes";
import {createNotes} from "../controller/createNotes";
import {deleteNotes} from "../controller/deleteNotes";
import {middlewareAuth } from "../middleware/middleauth";
const router = express.Router();

// @ts-ignore
router.get("/get-notes",middlewareAuth,getNotes);
// @ts-ignore
router.post("/post-notes",middlewareAuth,createNotes);
// @ts-ignore
router.delete("/delete-notes/:id",middlewareAuth,deleteNotes);
export default router;