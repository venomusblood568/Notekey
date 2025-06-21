import express from "express";
import { signup } from "../controller/signup";

const router = express.Router();

// @ts-ignore
router.post("/signup", signup);

export default router;
