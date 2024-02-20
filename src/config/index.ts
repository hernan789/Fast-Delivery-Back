import { Sequelize } from "sequelize";
require("dotenv").config();

const db = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: "postgres", // Cambiado de "localhost" a "postgres"
    dialect: "postgres",
    logging: false,
  }
);

db.authenticate()
  .then(() => {
    console.log("Conexión exitosa a la base de datos", db.config.database);
  })
  .catch((err: Error) => {
    console.error("No se pudo conectar a la base de datos", err);
  });

export default db;
