import Knex from "knex";
import knexfile from "../knexfile.js";
const knex = Knex(knexfile);

import express from "express";
import { post } from "../controllers/inventory-controller.js";

const inventoryRouter = express.Router();

//get inventory for single warehouse
inventoryRouter.get("/warehouses/:id/inventory", async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await knex("inventories").where({ warehouse_id: id });
    res.json(inventory);
  } catch (err) {
    res.json({ err });
  }
});

inventoryRouter.route("/inventories").post(post);

export { inventoryRouter };
