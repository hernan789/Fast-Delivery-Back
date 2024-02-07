import express from "express";
import userController from "../controllers/userControllers";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/login", userController.login);
router.get("/private", auth, userController.private)
router.post("/logout", auth, userController.logout);

export default router;