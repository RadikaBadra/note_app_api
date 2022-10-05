import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/NotesRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.APP_PORT, () => {
  console.log(`application listening to port ${process.env.APP_PORT}`);
});
