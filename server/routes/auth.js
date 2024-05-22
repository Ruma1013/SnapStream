import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Routes();

router.post("/login", login);

export default router;