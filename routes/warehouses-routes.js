import express from "express";
import knex from "knex";
import databaseConfig from "../knexfile";

const warehousesRouter = express.Router();

warehousesRouter.route("/api/warehouses").get(async (req, res) => {
  try {
    const warehouses = await knex(databaseConfig)
      .select("*")
      .from("warehouses");

    res.json(warehouses);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default warehousesRouter;
