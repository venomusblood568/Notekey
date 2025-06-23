import express from "express";
import testRoute from "./testRoute";
import authRoute from "./authRoute";
import noteRoute from "./noteRoute";
const router = express.Router();
router.use("/test", testRoute);
router.use("/auth", authRoute);
router.use("/notes", noteRoute)
export default router;
