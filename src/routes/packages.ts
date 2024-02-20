import express from "express";
import packagesController from "../controllers/packagesControllers.ts";
import auth from "../middlewares/auth.ts";
import isAdminMiddleware from "../middlewares/isAdminMiddleware.ts";

const router = express.Router();

router.post("/", auth, isAdminMiddleware, packagesController.createPackages); //OK //YA APLICADA EN FRONT
router.get("/", auth, packagesController.getAllPackages); //OK //SE MUESTRAN EN VISTA OBTENER PAQUETES Y PAQUETES DEL ADMIN.
 // FALTA HACER ESTADO DE REDUX PARA MOVER LOS PAQUETES ENTRE VISTAS SEGUN SU ESTADO
router.get("/:id", auth, packagesController.getPackageById); //OK
router.get("/userPackages/:id", auth, packagesController.getUserPackages)//SIN PROBAR
router.put("/assign/:id", auth, packagesController.assignPackage); //OK // SE ASIGNA EL ID DEL USUARIO LOGEADO
//AL CAMPO USERID DE CADA PAQUETE QUE SELECCIONES 
router.put("/removeUserId/:id", auth, packagesController.removeUserFromPackage)//OK // LE REMUEVE AL PAQUETE EL ID DEL USUARIO AL QUE LE PERTENECE
//PEDIDO HECHO EN SERVICES DEL FRONT, FALTA APLICAR EN EL COMPONENTE
router.delete("/:id", auth, isAdminMiddleware, packagesController.deletePackage); //OK
export default router;
