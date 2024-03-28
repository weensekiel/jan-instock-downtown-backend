import "dotenv/config";
import express from "express";
import cors from "cors";
import warehousesRouter from "./routes/warehouse-routes.js";

import { inventoryRouter } from "./routes/inventory-routes.js";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/warehouses", warehousesRouter);

app.use("/api", inventoryRouter);

app.get("/", (_req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
