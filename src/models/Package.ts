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
      type: S.ENUM("delivered", "cancelled", "inprogress"),
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
