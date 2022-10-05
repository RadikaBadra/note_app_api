import express from "express";
import NotesControllers from "../controllers/NotesControllers.js";

const router = express.Router();

router.get("/notes", NotesControllers.getNotes);
router.post("/notes", NotesControllers.createNote);
router.patch("/notes/:id", NotesControllers.updateNote);
router.delete("/notes/:id", NotesControllers.deleteNote);

export default router;
