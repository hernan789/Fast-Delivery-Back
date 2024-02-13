import express from "express";
import packagesController from "../controllers/packagesControllers.ts";
import auth from "../middlewares/auth.ts";

const router = express.Router();

router.post("/", packagesController.createPackages)
router.get("/", packagesController.getAllPackages)//OK
router.get("/:id", packagesController.getPackageById)//OK
router.delete("/:id", packagesController.deletePackage)

export default router;