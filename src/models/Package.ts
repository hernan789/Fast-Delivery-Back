import S, { EnumDataType } from "sequelize";
import db from "../config/index";

enum PackageStatus {
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  IN_PROGRESS = "inProgress",
}
class Package extends S.Model {
  adress: string;
  status: PackageStatus;
  owner: string;
  weight: number;
  date: Date;
}

Package.init(
  {
    adress: {
      type: S.STRING,
      allowNull: false,
    },
    status: {
      type: S.ENUM(
        PackageStatus.DELIVERED,
        PackageStatus.CANCELLED,
        PackageStatus.IN_PROGRESS
      ),
      allowNull: false,
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
    },
  },
  { sequelize: db, modelName: "packages" }
);

export default Package;
