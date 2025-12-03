import express from "express";
import { register, login } from "../controllers/authController.js";
import { createNote, getMyNotes, deleteNote } from "../controllers/noteController.js"; 
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.post("/notes", authRequired, createNote);
router.get("/notes", authRequired, getMyNotes);
router.delete("/notes/:id", authRequired, deleteNote); 

export default router;