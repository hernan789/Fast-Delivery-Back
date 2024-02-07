import express, { Application, Request, Response } from "express";
const app: Application = express();
const routes= require("./src/routes/index").default;
const morgan = require("morgan");
const cors = require("cors");
import db from "./src/config/index"
const PORT = 3001;


app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api",routes);

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send("GRUPO 3");
});

db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Servidor levantado en el puerto ${PORT}`)
    );
  })
  .catch((err: Error) => console.error(err));
