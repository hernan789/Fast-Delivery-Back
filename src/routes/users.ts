import express from "express";
import userController from "../controllers/userControllers.ts";
import auth from "../middlewares/auth.ts";

const router = express.Router();

router.post("/register", userController.register);//OK
router.post("/login", userController.login);//OK
// router.post("/forgot-password", userController.mailForgotPassword);
// router.post("/reset-password", userController.mailResetPassword);
router.post("/logout", auth, userController.logout);//OK
// router.get("/me", auth, userController.me);
router.delete("/:id", userController.deleteUserById)//OK

export default router;