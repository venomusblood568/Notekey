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
exports.deleteNote = void 0;
const notes_1 = __importDefault(require("../models/notes"));
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Note ID is required." });
    }
    try {
        const deleted = yield notes_1.default.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Note not found." });
        }
        return res.status(200).json({ message: "Note deleted successfully." });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
});
exports.deleteNote = deleteNote;
