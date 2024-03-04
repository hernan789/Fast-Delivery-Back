import express from "express";
import packagesController from "../controllers/packagesControllers.ts";
import auth from "../middlewares/auth.ts";
import isAdminMiddleware from "../middlewares/isAdminMiddleware.ts";

const router = express.Router();

router.post("/", auth, isAdminMiddleware, packagesController.createPackages); //OK //YA APLICADA EN FRONT
router.get("/", auth, packagesController.getAllPackages); //OK //SE MUESTRAN EN VISTA OBTENER PAQUETES Y PAQUETES DEL ADMIN.
// router.get("/:id", auth, packagesController.getPackageById); //OK
router.get("/userPackages", auth, packagesController.getUserPackages)//OK// YA APLICADA EN FRONT
router.put("/assign/:id", auth, packagesController.assignPackage); //OK // YA APLICADO EN FRONT// SE ASIGNA EL ID DEL USUARIO LOGEADO
//AL CAMPO USERID DE CADA PAQUETE QUE SELECCIONES
router.put("/removeUserId/:id", auth, packagesController.removeUserFromPackage); //OK //YA APLICADA EN FRONT // LE REMUEVE AL PAQUETE EL ID DEL USUARIO AL QUE LE PERTENECE
router.put("/updateToOngoing/:id", auth, packagesController.updatePackageStatusToOngoing)//OK// YA APLICADA EN FRONT
router.delete("/:id",auth,isAdminMiddleware,packagesController.deletePackage); //OK
export default router;
