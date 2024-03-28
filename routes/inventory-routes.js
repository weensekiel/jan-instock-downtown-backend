import express from "express";
import Knex from "knex";
import knexfile from "../knexfile.js";
const knex = Knex(knexfile);

const inventoryRouter = express.Router();

import { allInventory, warehouseInventory } from "../controllers/inventory-controller.js";

//get inventory for single warehouse
inventoryRouter.get("/warehouses/:id/inventory", warehouseInventory);

inventoryRouter.get("/inventories", allInventory)

export { inventoryRouter };
