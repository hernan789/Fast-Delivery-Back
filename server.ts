import express, { Application, Request, Response, NextFunction } from "express";
import db from "../fast-Delivery-Back/src/config/index";
import { config } from "dotenv";
const { Package, User } = require("../fast-Delivery-Back/src/models");
const cookieParser = require("cookie-parser");
const app: Application = express();
const routes = require("./src/routes/index").default;
const morgan = require("morgan");
const cors = require("cors");
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
const serverPort = process.env.SERVER_PORT || 3001;
const server = app.listen(serverPort, () =>
  console.log(`Servidor levantado en el puerto ${serverPort}`)
);
config();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use("/api", routes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send(err.message);
});

db.sync({ force: false })
  .then(() => {
    server;
  })
  .catch((err: Error) => console.error(err));

export { app, server };
