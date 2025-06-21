import { Request, Response } from "express";
import { User } from "../models";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req: Request, res: Response) => {
  const { name, email, date } = req.body;
  try {
    if (!name || !email || !date) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({ message: "User already exists." });
      return;
    }

    const newUser = new User({
      name,
      email,
      date,
      isgoogleuser: false,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "User registered successfully.",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        date: newUser.date,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Error", error: error });
  }
};
