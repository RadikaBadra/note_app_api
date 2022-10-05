import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export default class NotesControllers {
  static async getNotes(_, res) {
    try {
      const response = await prisma.notes.findMany();
      res
        .status(200)
        .json({ status: 200, data: response, msg: "data fetch success" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  static async createNotes(req, res) {
    try {
      const response = await prisma.notes.create({
        data: {
          id: uuidv4(),
          title: req.body.title,
          content: req.body.content,
          author_id: req.body.author_id,
        },
      });
      res
        .status(201)
        .json({ status: 201, data: response, msg: "data create success" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
}
