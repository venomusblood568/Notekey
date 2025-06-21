"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = (_a = process.env.port) !== null && _a !== void 0 ? _a : 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});
