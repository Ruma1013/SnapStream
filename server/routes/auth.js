import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router(); // Corrected from Routes to Router

router.post("/login", login);

export default router;
