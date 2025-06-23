"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getNotes_1 = require("../controller/getNotes");
const createNotes_1 = require("../controller/createNotes");
const deleteNotes_1 = require("../controller/deleteNotes");
const middleauth_1 = require("../middleware/middleauth");
const router = express_1.default.Router();
// @ts-ignore
router.get("/get-notes", middleauth_1.middlewareAuth, getNotes_1.getNotes);
// @ts-ignore
router.post("/post-notes", middleauth_1.middlewareAuth, createNotes_1.createNotes);
// @ts-ignore
router.delete("/delete-notes/:id", middleauth_1.middlewareAuth, deleteNotes_1.deleteNotes);
exports.default = router;
