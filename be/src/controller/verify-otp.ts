import { Request, Response } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import { User } from "../models";

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  const { email, otp, name, date } = req.body;

  if (!email || !otp || !name || !date) {
    res.status(400).json({ message: "All fields are required." });
    return;
  }

  try {
    await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        grant_type: "http://auth0.com/oauth/grant-type/passwordless/otp",
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        username: email,
        otp,
        realm: process.env.AUTH0_CONNECTION,
        scope: "openid profile email",
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

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
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Signup successful.",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        date: newUser.date,
      },
    });
  } catch (err: any) {
    console.error("OTP verification failed:", err.response?.data || err);
    res
      .status(401)
      .json({ message: "Invalid or expired OTP.", error: err.response?.data });
  }
};
