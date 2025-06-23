import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import apiRouter from "./routes";
import "./models";

dotenv.config();
const app = express();
const PORT = process.env.port;


app.use(
  cors({
    origin: [
      "https://notekey-duck.vercel.app/",
      "https://notekey-7pftltf16-venomusblood568s-projects.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
