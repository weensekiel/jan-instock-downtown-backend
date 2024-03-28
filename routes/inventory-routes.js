import express from "express";



import { allInventory, warehouseInventory, inventoryItem,post } from "../controllers/inventory-controller.js";


const inventoryRouter = express.Router();

inventoryRouter.route("/warehouses/:id/inventory").get(warehouseInventory);

inventoryRouter.get("/inventories", allInventory);

inventoryRouter.route("/inventory/:id").get(inventoryItem);


inventoryRouter.route("/inventories").post(post);

export { inventoryRouter };

