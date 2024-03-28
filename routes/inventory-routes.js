import express from "express";
import { allInventory, warehouseInventory, inventoryItem } from "../controllers/inventory-controller.js";

const inventoryRouter = express.Router();

inventoryRouter.route("/warehouses/:id/inventory").get(warehouseInventory);

inventoryRouter.get("/inventories", allInventory);

inventoryRouter.route("/inventory/:id").get(inventoryItem);

export default inventoryRouter;
