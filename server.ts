import express, { Application, Request, Response, NextFunction } from "express";
import db from "../fast-Delivery-Back/src/config/index";
import router from "./src/routes"
const app: Application = express();
const morgan = require("morgan");
const cors = require("cors");
const PORT = 3001;
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
// const serverHost = process.env.SERVER_HOST || "http://localhost:3001";
// const serverPort = process.env.SERVER_PORT || 3001;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use("/", router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send(err.message);
});

db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Servidor levantado en el puerto ${PORT}`)
    );
  })
  .catch((err: Error) => console.error(err));
