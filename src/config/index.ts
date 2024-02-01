import { Sequelize } from "sequelize";
const db = new Sequelize("fdeliverydb", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});
db.authenticate()
  .then(() => {
    console.log("Conexión exitosa a la base de datos", db.config.database);
  })
  .catch((err: Error) => {
    console.error("No se pudo conectar a la base de datos", err);
  });
export default db;
