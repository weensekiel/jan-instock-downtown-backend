import express from "express";

import { allInventory, warehouseInventory, inventoryItem, post, editOne, deleteOne } from "../controllers/inventory-controller.js";

const inventoryRouter = express.Router();

inventoryRouter.route("/warehouses/:id/inventory").get(warehouseInventory);

inventoryRouter.route("/inventories").get(allInventory);

inventoryRouter.route("/inventory/:id").get(inventoryItem);

inventoryRouter.route("/inventories").post(post);
inventoryRouter.route("/inventories/:id").put(editOne);
inventoryRouter.route("/inventories/:id").delete(deleteOne);

export { inventoryRouter };
