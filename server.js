const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("GRUPO 3");
});

app.listen(3001, () => {
  console.log(`Listening on port 3001`);
});
