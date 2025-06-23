import { Request, Response } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import { User } from "../models";

export const signinWithOtp = async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400).json({ message: "Email and OTP are required." });
    return;
  }

  try {
    const tokenResponse = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        grant_type: "http://auth0.com/oauth/grant-type/passwordless/otp",
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        username: email,
        otp: otp,
        realm: process.env.AUTH0_CONNECTION,
        scope: "openid profile email",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

   
    const accessToken = tokenResponse.data.access_token;

    
    const userInfo = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const auth0Email = userInfo.data.email;

    
    if (auth0Email !== email) {
      res.status(400).json({ message: "Email mismatch error." });
      return;
    }

    
    const user = await User.findOne({ email: auth0Email });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    
    const appToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token: appToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err: any) {
    console.error("Error verifying OTP:", err.response?.data || err);

    if (err.response?.status === 403 || err.response?.status === 400) {
      res.status(400).json({
        message: "Invalid OTP",
        error: err.response?.data || err.message,
      });
    } else {
      res.status(500).json({
        message: "Failed to verify OTP.",
        error: err.response?.data || err.message,
      });
    }
  }
};
