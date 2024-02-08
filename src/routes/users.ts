import { Request, Response, Router } from "express";
const usersRouter = Router();
import User from "../models/User";
import bcrypt from "bcrypt";
import { generateToken } from "../config/token";
import auth from "../middlewares/auth";

interface CreateUserRequestBody {
  name: string;
  surname: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

usersRouter.post(
  "/register",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, surname, email, password, isAdmin }: CreateUserRequestBody =
        req.body;

      // Verificar si el correo electrónico ya está registrado
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "El correo electrónico ya está registrado." });
      }

      // Crear un nuevo usuario
      const newUser = await User.create({
        name,
        surname,
        email,
        password,
        isAdmin,
      });

      res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  }
);

usersRouter.post(
  "/login",
  async (req: Request, res: Response): Promise<Response> => {
    const { email, password }: LoginRequestBody = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email no proporcionado." });
    }
    if (!password) {
      return res.status(400).json({ message: "Contraseña no proporcionada." });
    }
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (!existingUser) {
        return res.status(400).json({ error: "Usuario no encontrado." });
      }

      console.log(existingUser)
      const isValid = await bcrypt.compare(password, existingUser.password);
      if (!isValid) {
        return res.status(400).json({ message: "Contraseña inválida." });
      }
      const token = generateToken({
        name: existingUser.name,
        surname: existingUser.surname,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ message: "Usuario logeado con éxito." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  }
);

usersRouter.post(
  "/logout",
  auth,
  (req: Request, res: Response) => {
    if (!req.cookies.token) {
      return res.status(400).json({ message: "No hay sesión iniciada." });
    }
    res.clearCookie("token");
    res.status(204).json({ message: "Deslogueado correctamente" });
  }
);
// usersRouter.get("/private", (req: Request, res: Response) => {
//   res.status(200).json({ message: "Hello world" });
// });



export default usersRouter;

// import express from "express";
// import userController from "../controllers/userControllers.ts";
// import auth from "../middlewares/auth.ts";

// const router = express.Router();

// router.post("/register", userController.register);
// router.post("/login", userController.login);
// router.post("/logout", auth, userController.logout);

// export default router;
