import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import apiRouter from "./routes";
import "./models";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: [
      "https://notekey-duck.vercel.app",
      "https://notekey-7pftltf16-venomusblood568s-projects.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", apiRouter);


app.get("/", (req, res) => {
  res.send("✅ NoteKey Backend is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
