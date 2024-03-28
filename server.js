import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import warehousesRouter from "./routes/warehouses-routes.js";

//can't find this file

dotenv.config();
const app = express();

app.use(warehousesRouter);

const PORT = process.env.PORT;

app.get("/", (_req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
