import S from "sequelize";
import db from "../config/index";

class Package extends S.Model {
  adress: string;
  status: string;
  owner: string;
  isAdmin: boolean;
  date: number;
}

Package.init(
  {
    adress: {
      type: S.STRING,
      allowNull: false,
    },
    status: {
      type: S.ENUM("delivered", "cancelled", "inprogress", "pending"),
      allowNull: false,
      defaultValue: "pending"
    },
    owner: {
      type: S.STRING,
      allowNull: false,
      defaultValue: "N/A"
    },
    weight: {
      type: S.INTEGER,
      allowNull: false,
    },
    date: {
      type: S.DATE,
      allowNull: false,
      defaultValue: Date.now()
    },
  },
  { sequelize: db, modelName: "packages" }
);

export default Package;
