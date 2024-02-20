import { Request, Response } from "express";
import User from "../src/models/User";
import userController from "../src/controllers/userControllers";
import { CreateUserRequestBody } from "../src/types/userTypes";

describe('User Controller - Register', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  test('should register a new user', async () => {
    const reqBody: CreateUserRequestBody = {
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      isAdmin: false,
    };

    const req = { body: reqBody } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ name: 'John', email: 'john@example.com' }));
  });

  test('should return 400 if email format is incorrect', async () => {
    const reqBody: CreateUserRequestBody = {
      name: 'John',
      surname: 'Doe',
      email: 'invalid-email',
      password: 'password123',
      isAdmin: false,
    };

    const req = { body: reqBody } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "El email tiene un formato incorrecto." });
  });


});
