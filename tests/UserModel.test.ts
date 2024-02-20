const { Request, Response } = require("express");
import db from "../src/config";
import User from "../src/models/User";
import userController from "../src/controllers/userControllers";
import { jest, describe, expect, beforeEach, test } from "@jest/globals";
import { Request, Response } from "express";

describe('User Model', () => {
  beforeAll(async () => {
    await db.sync({ force: true }); 
  });
  afterAll(async () => {
    await db.close(); 
  });

  test('should create a new user', async () => {
    const newUser = await User.create({
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      isAdmin: false,
      isDisabled: false
    });

    expect(newUser).toBeDefined();
    expect(newUser.name).toBe('John');
    expect(newUser.surname).toBe('Doe');
    expect(newUser.email).toBe('john@example.com');
    expect(newUser.isAdmin).toBe(false);
    expect(newUser.isDisabled).toBe(false);
  });
});