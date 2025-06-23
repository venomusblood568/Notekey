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
exports.getNotes = void 0;
const notes_1 = __importDefault(require("../models/notes"));
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        if (!userId) {
            res
                .status(400)
                .json({ message: "User ID is required as a query param." });
            return;
        }
        const notes = yield notes_1.default.find({ user: userId })
            .sort({ createdAt: -1 })
            .lean();
        res.status(200).json(notes);
    }
    catch (err) {
        console.error("Error fetching notes:", err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getNotes = getNotes;
