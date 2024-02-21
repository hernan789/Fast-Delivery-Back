import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../config/token";
import { LoginRequestBody, CreateUserRequestBody } from "../types/userTypes";
import validate from "../utils/validations";
import { transporter } from "../config/mailTRansporter";
import emailTemplates from "../utils/emailTemplates.ts";

interface CustomRequest extends Request {
  user?: {
    id: number;
  };
}
const userController = {
  register: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, surname, email, password, isAdmin }: CreateUserRequestBody =
        req.body;

      if (!validate.email(email)) {
        return res
          .status(400)
          .json({ message: "El email tiene un formato incorrecto." });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "El correo electrónico ya está registrado." });
      }
      const newUser = await User.create({
        name,
        surname,
        email,
        password,
        isAdmin,
      });
      const userResponse = { ...newUser.toJSON(), password: undefined };
      const mailOptions = emailTemplates.welcome(userResponse);
      await transporter.sendMail(mailOptions);
      res.status(201).json(userResponse);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
  },
  login: async (req: Request, res: Response): Promise<Response> => {
    const { email, password }: LoginRequestBody = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email no proporcionado." });
    }
    if (!validate.email(email)) {
      return res
        .status(400)
        .json({ message: "El formato de correo electrónico es inválido." });
    }
    if (!password) {
      return res.status(400).json({ message: "Contraseña no proporcionada." });
    }
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (!existingUser) {
        return res.status(400).json({ error: "Usuario no encontrado." });
      }

      const isOk = await existingUser.validatePassword(password);
      if (!isOk) return res.sendStatus(401);

      const existingUserToJson = existingUser.toJSON()

      const token = generateToken({
        id: existingUserToJson.id,
        isAdmin: existingUserToJson.isAdmin,
      });
      res.cookie("token", token, { httpOnly: true });
      return res.status(200).json({ message: "Usuario logeado con éxito." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
  },
  logout: async (req: Request, res: Response): Promise<Response> => {
    if (!req.cookies ||!req.cookies.token) {
      return res.status(400).json({ message: "No hay sesión iniciada." });
    }
    res.clearCookie("token");
    return res.status(204).json({ message: "Deslogueado correctamente" });
  },
  me: async (req: CustomRequest, res: Response): Promise<Response> => {
    const userId = req.user.id;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "id no encontrado en el token." });
    }
    try {
      const user = await User.findOne({
        where: { userId: userId },
        attributes: ["name", "surname", "email", "isAdmin"],
      });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }
      return res.json(user.get({ plain: true }));
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error de servidor");
    }
  },
  //   mailForgotPassword: async (
  //     req: Request,
  //     res: Response
  //   ): Promise<Response> => {
  //     const { email } = req.body;
  //     if (!email) {
  //       return res
  //         .status(400)
  //         .json({ message: "El campo email es obligatorio." });
  //     }
  //     if (!validate.email(email)) {
  //       return res
  //         .status(400)
  //         .json({ message: "El formato de correo electrónico es inválido." });
  //     }
  //     try {
  //       const user = await User.findOne({ where: { email } });
  //       if (!user) {
  //         return res.status(404).json({ message: "Usuario no registrado." });
  //       }
  //       const resetToken = generateToken({
  //         name: user.name,
  //         surname: user.surname,
  //         email: user.email,
  //         isAdmin: user.isAdmin,
  //       });
  //       user.resetPasswordToken = resetToken;
  //       await user.save();
  //       const mailOptions = emailTemplates.forgotPassword(user, resetToken);
  //       await transporter.sendMail(mailOptions);
  //       res.json({
  //         message:
  //           "Se envió un correo electrónico con instrucciones para restablecer la contraseña.",
  //       });
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json(error);
  //     }
  //   },
  // mailResetPassword : async (req: Request, res: Response): Promise<Response> => {
  //     const { token, newPassword } = req.body;
  //     if (!token) {
  //       return res.status(400).json({ message: "Se requiere un token." });
  //     }
  //     if (!newPassword) {
  //       return res
  //         .status(400)
  //         .json({ message: "Se requiere ingresar una nueva contraseña." });
  //     }
  //     if (!validate.password(newPassword)) {
  //       return res.status(400).json({
  //         message:
  //           "La nueva contraseña no cumple con los requisitos mínimos:\n" +
  //           "✓ Solo letras y números.\n" +
  //           "✓ 1 letra mayúscula.\n" +
  //           "✓ 1 letra minúscula.\n" +
  //           "✓ 1 número.\n" +
  //           "✓ 8 caracteres de largo.",
  //       });
  //     }
  //     try {
  //       const user = await User.findOne({
  //         where: {
  //           resetPasswordToken: token,
  //         },
  //       });
  //       if (!user) {
  //         return res.status(400).json({ message: "Token inválido o expirado." });
  //       }
  //       const hashedPassword = await user.hash(newPassword, user.getDataValue("salt"));
  //       user.password = hashedPassword;
  //       user.resetPasswordToken = null;
  //       await user.save();
  //       const confirmMailOptions = emailTemplates.resetPasswordConfirmation(user);
  //       await transporter.sendMail(confirmMailOptions);
  //       res.json({ message: "Contraseña actualizada con éxito." });
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json(error);
  //     }
  //   },
  deleteUserById: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: "ID de usuario inválido." });
    }
    try {
      const userId = parseInt(id);
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }
      await user.destroy();
      return res.json({ message: "Usuario eliminado con éxito." });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  },
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.findAll({
        where: { isAdmin: false },
        attributes: ["name", "isDisabled"],
      });
      res.json(users);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  getUserById: async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    try {
      const user = await User.findByPk(userId, {
        attributes: ["name", "isDisabled"],
      });

      if (!user)
        return res.status(404).json({ error: "Usuario no encontrado" });

      res.json(user);
    } catch (error) {
      console.error("Error al obtener usuario por ID:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};

export default userController;
