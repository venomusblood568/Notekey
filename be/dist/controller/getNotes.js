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
        // Check if user info is present
        if (!req.user || !req.user.userId) {
            res.status(401).json({ message: "Unauthorized: Missing user info" });
            return;
        }
        // Fetch notes for the authenticated user
        const notes = yield notes_1.default.find({ user: req.user.userId })
            .sort({ createdAt: -1 })
            .lean();
        res.status(200).json(notes); // Return notes in response
    }
    catch (err) {
        console.error("Error fetching notes:", err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getNotes = getNotes;
