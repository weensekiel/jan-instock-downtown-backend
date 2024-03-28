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

async function addWarehouse(req, res) {
  try {
      const { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = req.body;

      if (!warehouse_name || !address || !city || !country || !contact_name || !contact_position || !contact_phone || !contact_email) {
          return res.status(400).json({ error: "Please fill out all fields." });
      }

      const id = await knex("warehouses").insert({
          warehouse_name,
          address,
          city,
          country,
          contact_name,
          contact_position,
          contact_phone,
          contact_email
      });

      res.status(201).json({ id, warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email });
  } catch (e) {
      res.status(500).json({ error: e.message });
  }
}

export { all, findOne, addWarehouse };
