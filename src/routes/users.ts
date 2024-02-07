import {Request, Response,Router } from "express";
const usersRouter = Router();
import User from "../models/User";


interface CreateUserRequestBody {
    name: string;
    surname: string;
    email: string;
    password: string;
    isAdmin: boolean;
  }

usersRouter.post("/register", async (req:Request, res:Response):Promise<Response> => {
  try {
    const { name, surname, email, password, isAdmin }: CreateUserRequestBody = req.body;

    // Verificar si el correo electrónico ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    // Crear un nuevo usuario
    const newUser = await User.create({
      name, surname, email, password, isAdmin
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
})

export default usersRouter;

