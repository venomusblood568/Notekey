"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error(`MONGO_URI is missing`);
}
mongoose_1.default
    .connect(uri)
    .then(() => console.log(`Connected to mongodb`))
    .catch((error) => console.log("Mongodb connection error:", error));
