import { Request, Response } from "express";
import axios from "axios";

export const requestOtp = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email is required." });
    return;
  }

  try {
    await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/passwordless/start`,
      {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        connection: process.env.AUTH0_CONNECTION,
        email,
        send: "code",
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    res.status(200).json({ message: "OTP sent to email." });
  } catch (error: any) {
    console.error("OTP send error:", error.response?.data || error);
    res
      .status(500)
      .json({ message: "OTP send failed", error: error.response?.data });
  }
};
