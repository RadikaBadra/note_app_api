import express from "express";
import NotesControllers from "../controllers/NotesControllers.js";
import UserControllers from "../controllers/UserControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/notes/:author_id", auth, NotesControllers.getNotes);
router.get("/note/:id", auth, NotesControllers.getNote);
router.get("/archive/:id", auth, NotesControllers.getArchiveNotes);
router.post("/notes", auth, NotesControllers.createNote);
router.patch("/notes/:id", auth, NotesControllers.updateNote);
router.patch("/archive/:id", auth, NotesControllers.archiveNote);
router.delete("/notes/:id", auth, NotesControllers.deleteNote);

// user routes
router.post("/register", UserControllers.userRegister);
router.post("/login", UserControllers.userLogin);

export default router;
