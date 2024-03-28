import Knex from "knex";
import knexfile from "../knexfile.js";
const knex = Knex(knexfile);

async function warehouseInventory(req, res) {
  try {
    const { id } = req.params;
    const warehouseInventory = await knex("inventories").where({ warehouse_id: id });

    if (warehouseInventory === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${id} not found`,
      });
    }
    res.status(200).json(warehouseInventory);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function allInventory(req, res) {
  try {
    const allInventory = await knex("inventories")
      .select("inventories.id", "warehouses.warehouse_name", "item_name", "description", "category", "status", "quantity")
      .join("warehouses", "warehouses.id", "inventories.warehouse_id");
    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function inventoryItem(req, res) {
  try {
    const { id } = req.params;
    const inventoryItem = await knex("inventories")
      .where({ "inventories.id": id })
      .select("inventories.id", "warehouses.warehouse_name", "item_name", "description", "category", "status", "quantity")
      .join("warehouses", "warehouses.id", "inventories.warehouse_id");

    if (inventoryItem === 0) {
      return res.status(404).json({
        message: `Inventory with ID ${id} not found`,
      });
    }
    res.status(200).json(inventoryItem);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export { warehouseInventory, allInventory, inventoryItem };
