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
exports.deleteNotes = void 0;
const notes_1 = __importDefault(require("../models/notes"));
const deleteNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield notes_1.default.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId,
        });
        if (!note) {
            res.status(404).json({ message: "Note not found" });
            return;
        }
        res.json({ message: "Note deleted successfully" });
    }
    catch (err) {
        console.error("Error deleting note:", err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.deleteNotes = deleteNotes;
