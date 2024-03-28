import Knex from "knex";
import knexfile from "../knexfile.js";
const knex = Knex(knexfile);

async function all(req, res) {
  try {
    const warehouses = await knex("warehouses").select("*");

    res.json(warehouses);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function findOne(req, res) {
  try {
    console.log(req.params.id);
    const warehouseFound = await knex("warehouses")
      .select("*")
      .where({ id: req.params.id });

    if (warehouseFound === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.warehouseId} not found`,
      });
    }

    const warehouseData = warehouseFound[0];
    res.json(warehouseData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Unable to retrieve warehouse data for warehouse with ID ${req.params.warehouseId},`,
    });
  }
}

export { all, findOne };