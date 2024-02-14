import S from "sequelize";
import db from "../config/index";

enum PackageStatus {
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  PENDING = "pending",
}

class Package extends S.Model {
  declare trackId: string;
  declare address: string;
  declare status: PackageStatus;
  declare owner: string;
  declare weight: number;
  declare date: Date;
}

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

Package.beforeCreate(async (packages) => {
  try {
    const trackId = `#${Math.floor(Math.random() * 10)}${String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${
      packages.weight
    } `;
    packages.trackId = trackId;
  } catch (error) {
    throw new Error("ERROR");
  }
});

export default Package;
