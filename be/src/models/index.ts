import mongoose from "mongoose";
import User from "./user";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error(`MONGO_URI is missing`);
}

mongoose
  .connect(uri)
  .then(() => console.log(`Connected to mongodb`))
  .catch((error) => console.log("Mongodb connection error:", error));

export { User };
