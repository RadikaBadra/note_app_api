import express from "express";
import NotesControllers from "../controllers/NotesControllers.js";

const router = express.Router();

router.get("/notes", NotesControllers.getNotes);
router.post("/notes", NotesControllers.createNotes)

export default router;