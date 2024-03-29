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

async function deleteOne(req, res) {
  try {
    console.log(req.params.id);
    const warehouseDelete = await knex("warehouses")
      .delete("*")
      .where({ id: req.params.id });

    if (warehouseDelete === 0) {
      return res.status(404).json({ message: "Warehouse ID not found" });
    }
    const warehouseData = warehouseFound[0];
    res.json(warehouseData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not delete warehouse" });
  }
}

async function addWarehouse(req, res) {
  try {
    const {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    } = req.body;

    if (
      !warehouse_name ||
      !address ||
      !city ||
      !country ||
      !contact_name ||
      !contact_position ||
      !contact_phone ||
      !contact_email
    ) {
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
      contact_email,
    });

    res
      .status(201)
      .json({
        id,
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
      });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function editWarehouse(req, res) {
  try {
    const {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    } = req.body;

    if (
      !warehouse_name ||
      !address ||
      !city ||
      !country ||
      !contact_name ||
      !contact_position ||
      !contact_phone ||
      !contact_email
    ) {
      return res.status(400).json({ error: "Please fill out all fields." });
    }

    const { id } = req.params;

    const warehouseToUpdate = {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email
    };

    const updatedRows = await knex("warehouses")
    .where({id})
    .update(warehouseToUpdate);

    if (updatedRows === 0) {
      return res.status(404).json({error: "Warehouse not found"});
    }

    const updatedWarehouse = await knex("warehouses")
    .where({id})
    .select("*")
    .first();

    res.status(200).json(updatedWarehouse);
  } catch (e) {
    res.status(500).json({error: (e)});
  }
}

export { all, findOne, deleteOne, addWarehouse, editWarehouse };
