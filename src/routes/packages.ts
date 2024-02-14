import express from "express";
import packagesController from "../controllers/packagesControllers.ts";
import auth from "../middlewares/auth.ts";
import isAdminMiddleware from "../middlewares/isAdminMiddleware.ts";

const router = express.Router();

router.post("/", auth, isAdminMiddleware, packagesController.createPackages); //OK
// router.post("/assign/:id", auth, packagesController.assignPackage); 
router.get("/", auth, packagesController.getAllPackages); //OK
router.get("/:id", auth, packagesController.getPackageById); //OK
router.delete("/:id", auth, isAdminMiddleware, packagesController.deletePackage); //OK

export default router;
