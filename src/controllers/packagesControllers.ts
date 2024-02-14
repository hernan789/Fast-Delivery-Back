import { Request, Response } from "express";
import Package from "../models/Package.ts";
import validate from "../utils/validations";
import { PackageData } from "../types/packagesTypes.ts";

const packagesControllers = {
createPackages: async (req: Request, res: Response) => {
  try {
    const { address, owner, weight, date }: PackageData = req.body;
    if (!address || !owner || !weight || !date) return res.status(400).json({ message: 'Por favor, completa todos los campos' });
    const newPackage = await Package.create({
      address,
      owner,
      weight,
      date,
    });
    return res.status(201).json(newPackage);
  } catch (error) {
    console.error('Error al crear el paquete:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
},
getAllPackages: async (req: Request, res: Response) => {
  try {
    const packages = await Package.findAll();
    return res.json(packages);
  } catch (error) {
    console.error('Error al obtener los paquetes:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
},
getPackageById: async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const packageId = parseInt(id);
    const packageItem = await Package.findByPk(packageId);
    if (!packageItem) return res.status(404).json({ message: 'Paquete no encontrado' });
    return res.json(packageItem);
  } catch (error) {
    console.error('Error al obtener el paquete:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
},
deletePackage: async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const packageId = parseInt(id);
    const packageItem = await Package.findByPk(packageId);
    if (!packageItem) return res.status(404).json({ message: 'Paquete no encontrado' });
    await packageItem.destroy();
    return res.json({ message: 'Paquete eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el paquete:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
},

// assignPackage: async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const userId = req.user.id; 
//   try {
//     const packageItem = await Package.findByPk(id);
//     if (!packageItem)return res.status(404).json({ message: 'Paquete no encontrado' }); 
//     packageItem.userId = userId;
//     await packageItem.save();
//     return res.status(200).json({ message: 'Paquete asignado exitosamente' });
//   } catch (error) {
//     console.error('Error al asignar paquete:', error);
//     return res.status(500).json({ error: 'Error interno del servidor' });
//   }
// },
}

export default packagesControllers;
