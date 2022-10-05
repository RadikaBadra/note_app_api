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

  static async getNote(req, res) {
    try {
      const response = await prisma.notes.findUnique({
        where: {
          id: req.params.id,
        },
      });
      if (response !== null) {
        res
          .status(200)
          .json({ status: 200, data: response, msg: "data fetch success" });
      } else {
        res.status(400).json({ msg: "data not found" });
      }
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  static async createNote(req, res) {
    try {
      if (req.body.title != "" && req.body.content != "") {
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
      } else {
        res.status(400).json({ msg: "form can't be empty" });
      }
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  static async updateNote(req, res) {
    try {
      if (req.body.title != "" && req.body.content != "") {
        const response = await prisma.notes.update({
          where: {
            id: req.params.id,
          },
          data: {
            id: req.params.id,
            title: req.body.title,
            content: req.body.content,
            author_id: req.body.author_id,
          },
        });
        res
          .status(201)
          .json({ status: 201, data: response, msg: "data update success" });
      } else {
        res.status(400).json({ msg: "form can't be empty" });
      }
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  static async deleteNote(req, res) {
    try {
      const response = await prisma.notes.delete({
        where: {
          id: req.params.id,
        },
      });
      res.status(201).json({ status: 201, msg: "data delete success" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
}
