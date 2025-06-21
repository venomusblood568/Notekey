import express from "express";
import testRoute from "./testRoute";
import authRoute from "./authRoute";
const router = express.Router();
router.use("/test", testRoute);
router.use("/auth", authRoute);
export default router;
