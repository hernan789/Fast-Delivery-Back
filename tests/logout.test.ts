import db from "../src/config";
import User from "../src/models/User";
import userController from "../src/controllers/userControllers";
import { Request, Response } from "express";

describe('User Controller - Logout', () => {
  beforeAll(async () => {
    await db.sync({ force: true }); 
  });
  
  afterAll(async () => {
    await db.close(); 
  });

  test('should return 400 if no session is started', async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.logout(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "No hay sesión iniciada." });
  });

  test('should clear cookie and return 204 if session is started', async () => {
    const req = {
      cookies: {
        token: "someToken"
      }
    } as unknown as Request;
    const res = {
      clearCookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.logout(req, res);

    expect(res.clearCookie).toHaveBeenCalledWith("token");
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({ message: "Deslogueado correctamente" });
  });
});
