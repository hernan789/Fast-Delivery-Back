import express from "express";
import userController from "../controllers/userControllers.ts";
import auth from "../middlewares/auth.ts";
import isAdminMiddleware from "../middlewares/isAdminMiddleware.ts";

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Registra un nuevo usuario en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 surname:
 *                   type: string
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 isAdmin:
 *                   type: boolean
 *       400:
 *         description: Error en los datos de entrada
 *       500:
 *         description: Error interno del servidor
 */

router.post("/register", userController.register); //OK

router.post("/login", userController.login); //OK
router.post("/forgot-password", userController.mailForgotPassword); //OK
router.post("/reset-password", userController.mailResetPassword);
router.post("/logout", auth, userController.logout); //OK
router.get("/me", auth, userController.me); //OK
router.get("/", auth, isAdminMiddleware, userController.getAllUsers); //OK
router.get("/:id", auth, isAdminMiddleware, userController.getUserById); //OK
router.delete("/:id", userController.deleteUserById); //OK

export default router;
