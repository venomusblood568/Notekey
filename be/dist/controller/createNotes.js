"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotes = void 0;
const notes_1 = __importDefault(require("../models/notes"));
const createNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }
        const note = new notes_1.default({
            title,
            user: userId,
        });
        const savedNote = yield note.save();
        res.status(201).json(savedNote);
    }
    catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createNotes = createNotes;
