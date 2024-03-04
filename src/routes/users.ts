import express from "express";
import userController from "../controllers/userControllers.ts";
import auth from "../middlewares/auth.ts";
import isAdminMiddleware from "../middlewares/isAdminMiddleware.ts";

const router = express.Router();

router.post("/register", userController.register); //OK
router.post("/login", userController.login); //OK
router.post("/forgot-password", userController.mailForgotPassword);//OK
router.post("/reset-password", userController.mailResetPassword);
router.post("/logout", auth, userController.logout); //OK
router.post("/affidavit", userController.affidavit);
router.get("/me", auth, userController.me)//OK
router.get("/", auth, isAdminMiddleware, userController.getAllUsers)//OK
router.get("/:id", auth, isAdminMiddleware, userController.getUserById)//OK
router.delete("/:id", userController.deleteUserById);//OK

export default router;
