import { Request, Response } from "express";
import { User, Users } from "../models";
import bcrypt from "bcrypt";
import { generateToken } from "../config/token";

const userController = {
  private: async (req: Request, res: Response) => {
    res.status(200).json("Hello world");
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email no proporcionado." });
    }

    // if (!validate.email(email)) {
    //   return res
    //     .status(400)
    //     .json({ message: "El email no tiene un formato correcto." });
    // }

    if (!password) {
      return res.status(400).json({ message: "Contraseña no proporcionada." });
    }

    try {
      const user: Users | null = (
        await User.findOne({ where: { email } })
      )?.toJSON() as Users | null;

      if (!user) {
        return res.status(400).json({ message: "Usuario no encontrado." });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return res.status(400).json({ message: "Contraseña inválida." });
      }

      const payload: Users = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        isAdmin: user.isAdmin,
      };

      const token = generateToken(payload);

      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ payload, message: "Usuario logeado con éxito." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error de servidor." });
    }
  },
   logout : (req: Request, res: Response): void | Response => {
    if (!req.cookies.token) {
      return res.status(400).json({ message: "No hay sesión iniciada." });
    }
    res.clearCookie("token");
    res.status(204).json({ message: "Deslogueado correctamente" });
  },
};


export default userController;
