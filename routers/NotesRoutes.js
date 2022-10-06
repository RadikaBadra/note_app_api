import express from "express";
import NotesControllers from "../controllers/NotesControllers.js";
import UserControllers from "../controllers/UserControllers.js";
import createError from "http-errors";

const router = express.Router();

router.get("/notes", NotesControllers.getNotes);
router.get("/notes/:id", NotesControllers.getNote);
router.post("/notes", NotesControllers.createNote);
router.patch("/notes/:id", NotesControllers.updateNote);
router.delete("/notes/:id", NotesControllers.deleteNote);
router.post("/register", UserControllers.userRegister);
router.post("/login", UserControllers.userLogin);

export default router;
