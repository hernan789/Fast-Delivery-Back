const { Request, Response } = require("express");
import db from "../src/config";
import User from "../src/models/User";
import userController from "../src/controllers/userControllers";
import { jest, describe, expect, beforeEach, test } from "@jest/globals";
import { Request, Response } from "express";

import { generateToken } from "../src/config/token.ts";
import {
  LoginRequestBody,
  CreateUserRequestBody,
} from "../src/types/userTypes.ts";

describe("userController", () => {
  describe("login", () => {
    beforeAll(async () => {
      await db.validate();
      jest.mock("../src/models/User");
    });

    afterAll(async () => {
      await User.destroy({ where: {} });

      await db.close();
      jest.clearAllMocks();
    });
    const setupReqRes = (reqBody: any) => {
      const req: Partial<Request> = { body: reqBody };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      return { req, res };
    };
    it("if there is no email return 400", async () => {
      const { req, res } = setupReqRes({ password: "password" });

      await userController.login(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Email no proporcionado.",
      });
    });
    it("should return 400 if email format is invalid", async () => {
      const { req, res } = setupReqRes({ email: "password" });

      await userController.login(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "El formato de correo electrónico es inválido.",
      });
    });
    it("should return 400 if no password is provided", async () => {
      const { req, res } = setupReqRes({ email: "hola@gmail.com" });

      await userController.login(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Contraseña no proporcionada.",
      });
    });
    xit("should return 400 if no user was found", async () => {
      const testUser = {
        email: "garmando@gmail.com",
        password: "otroletravaladna",
      };
      const { req, res } = setupReqRes(testUser);

      await userController.login(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Usuario no encontrado.",
      });
    });
    xit("should return a status 200 if the login was successfull", async () => {
      const testUser = {
        email: "hernanduarte@gmail.com",
        password: "Hernan1234",
      };

      const req: Partial<Request> = { body: testUser };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        cookie: jest.fn(),
      } as unknown as Response;

      await userController.login(req as Request, res);
      // expect(res.cookie).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Usuario logeado con éxito.",
      });
    });
  });
});
