import S from "sequelize";

import db from "../config/index";
export interface Users {
  id: number;
  name: string;
  surname: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  salt?: string;
}
class User extends S.Model<Users> {}

User.init(
  {
    id: {
      type: S.INTEGER,
      allowNull: false,
      primaryKey : true
    },
    name: {
      type: S.STRING,
      allowNull: false,
    },
    surname: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "users" }
);

export default User;
