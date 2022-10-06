import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import accessToken from "./../utils/jwt.js";
import bcrypt from "bcryptjs";
import createError from "http-errors";

dotenv.config();

const prisma = new PrismaClient();

export default class UserControllers {
  static async userRegister(req, res) {
    try {
      const response = await prisma.users.create({
        data: {
          id: uuidv4(),
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
        },
      });
      res.accessToken = await accessToken.signAccessToken(response);
      res.status(201).json({
        status: 201,
        token: res.accessToken,
        data: {
          email: response.email,
          password: response.password,
        },
        msg: "user create success",
      });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  static async userLogin(req, res) {
    try {
      const response = await prisma.users.findUnique({
        where: {
          email: req.body.email,
        },
      });
      if (!response) {
        throw createError.NotFound("User not found");
      }

      const checkPassword = bcrypt.compareSync(
        req.body.password,
        response.password
      );

      if (!checkPassword) {
        throw createError.NotFound("Email or Password invalid");
      }
      delete response.password;

      res.accessToken = await accessToken.signAccessToken(response);
      res.status(200).json({
        status: 200,
        token: res.accessToken,
        data: {
          email: response.email,
          password: response.password,
        },
        msg: "user login success",
      });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
}
