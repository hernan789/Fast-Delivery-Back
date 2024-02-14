import S, { EnumDataType } from "sequelize";
import db from "../config/index";

enum PackageStatus {
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  PENDING = "pending",
}

interface Package {
  trackId: string;
  address: string;
  status: PackageStatus;
  owner: string;
  weight: number;
  date: Date;
}
class Package extends S.Model {}

Package.init(
  {
    trackId: {
      type: S.STRING,
      allowNull: true,
    },
    address: {
      type: S.STRING,
      allowNull: false,
    },
    status: {
      type: S.ENUM(
        PackageStatus.DELIVERED,
        PackageStatus.CANCELLED,
        PackageStatus.PENDING
      ),
      allowNull: false,
      defaultValue: PackageStatus.PENDING,
    },
    owner: {
      type: S.STRING,
      allowNull: false,
    },
    weight: {
      type: S.INTEGER,
      allowNull: false,
    },
    date: {
      type: S.DATE,
      allowNull: false,
      defaultValue: Date.now(),
    },
  },
  { sequelize: db, modelName: "packages" }
);
//////HACE QUE EL CODIGO QUE SE GENEREA SEA UN POCO MAS CORTO A COMPARACION DEL DE ABAJO
Package.beforeCreate(async (packages) => {
  try {
    const trackId = `#${Math.floor(Math.random() * 10)}${String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    )}${Math.floor(Math.random() * 1000)}`;
    packages.trackId = trackId;
  } catch (error) {
    throw new Error("ERROR");
  }
});
//////HACE QUE EL CODIGO QUE SE GENEREA SEA UN POCO MAS CORTO A COMPARACION DEL DE ABAJO

// Package.beforeCreate(async (packages) => {
//   try {
//     const trackId = `#${Math.floor(Math.random() * 10)}${String.fromCharCode(
//       65 + Math.floor(Math.random() * 26)
//     )}${Math.floor(Math.random() * 100)}${Math.floor(Math.random() * 100)}${
//       packages.weight
//     } `;
//     packages.trackId = trackId;
//   } catch (error) {
//     throw new Error("ERROR");
//   }
// });


export default Package;
