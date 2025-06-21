import express from "express";
import testRoute from "./testRoute";

const router = express.Router();
router.use("/test",testRoute);

export default router;