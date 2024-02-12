import express from "express";
import userController from "../controllers/userControllers.ts";
import auth from "../middlewares/auth.ts";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
// router.post("/forgot-password", userController.mailForgotPassword);
// router.post("/reset-password", userController.mailResetPassword);
router.post("/logout", auth, userController.logout);
router.get("/me", auth, userController.me);

export default router;