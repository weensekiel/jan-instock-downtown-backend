require("dotenv").config();

const express = require("express");
const cors = require("cors");
const {inventoryRouter} = require("./routes/inventory.js")

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
// is there a way to update this to change, that PORT would be in the front-end ENV and not available here, no?

const PORT = process.env.PORT;
const SingleWarehouse = require("./routes/SingleWarehouse");

app.use(express.json());

app.get("/warehouses/:warehouseId", SingleWarehouse);

app.use(cors())
app.use(express.json())
app.use("/api", inventoryRouter)

app.get("/", (_req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
