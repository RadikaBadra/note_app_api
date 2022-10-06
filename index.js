import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/index.js";
import createError from 'http-errors';

dotenv.config();

const app = express();

router.use(async (req, res, next) => {
  next(createError.NotFound("Route not Found"));
});
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: false,
    message: err.message,
  });
});

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.APP_PORT, () => {
  console.log(`application listening to port ${process.env.APP_PORT}`);
});
