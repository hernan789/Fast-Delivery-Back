import express, { Application, Request, Response, NextFunction } from "express";
import db from "../fast-Delivery-Back/src/config/index";
import { config } from "dotenv";
const cookieParser = require("cookie-parser")
const app: Application = express();
const routes= require("./src/routes/index").default;
const morgan = require("morgan");
const cors = require("cors");
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
const serverPort = process.env.SERVER_PORT || 3001;

config();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use("/api",routes);
 app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
   console.error(err);
   res.status(500).send(err.message);  
 });

db.sync({ force: false })
  .then(() => {
    app.listen(serverPort, () =>
      console.log(`Servidor levantado en el puerto ${serverPort}`)
    );
  })
  .catch((err: Error) => console.error(err));


// import express, { Application, Request, Response, NextFunction } from "express";
// import db from "../fast-Delivery-Back/src/config/index";
// import router from "./src/routes"
// const app: Application = express();
// const morgan = require("morgan");
// const cors = require("cors");
// const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
// // const serverHost = process.env.SERVER_HOST || "http://localhost:3001";
//  const serverPort = process.env.SERVER_PORT || 3001;


// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cors({ origin: corsOrigin, credentials: true }));
// app.use("/",router);

// // app.get("/", async (req: Request, res: Response): Promise<Response> => {
// //   return res.status(200).send("GRUPO 3");
// // });
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err);
//   res.status(500).send(err.message);  
// });

// db.sync({ force: false })
//   .then(() => {
//     app.listen(serverPort, () =>
//       console.log(`Servidor levantado en el puerto ${serverPort}`)
//     );
//   })
//   .catch((err: Error) => console.error(err));