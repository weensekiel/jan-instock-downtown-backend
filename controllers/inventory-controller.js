import Knex from "knex";
import knexfile from "../knexfile.js";
const knex = Knex(knexfile);

async function post(req, res) {
  const { warehouse_id, item_name, description, category, status, quantity } =
    req.body;

  try {
    if (!item_name || !description || !category || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!warehouse_id) {
      return res.status(400).json({ message: "No warehouse ID found" });
    }
    if (typeof parseInt(quantity) != "number") {
      return res.status(400).json({ message: "Quantity must be a number" });
    }
    await knex("inventories").insert(req.body);
    res.status(201).json({ message: "Post successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error });
  }
}

async function editOne(req, res) {
  const { id } = req.params;
  const { warehouse_id, item_name, description, category, status, quantity } =
    req.body;

  try {
    if (!item_name || !description || !category || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!id) {
      return res.status(404).json({ message: "Inventory ID was not found" });
    }
    if (!warehouse_id) {
      return res.status(400).json({ message: "No warehouse ID found" });
    }
    if (typeof parseInt(quantity) != "number") {
      return res.status(400).json({ message: "Quantity must be a number" });
    }

    await knex("inventories").where({ id: id }).update(req.body);
    res.status(200).json({ message: "Update successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error });
  }
}

async function warehouseInventory(req, res) {
  try {
    const { id } = req.params;
    const warehouseInventory = await knex("inventories").where({
      warehouse_id: id,
    });

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
      .select(
        "inventories.id",
        "warehouses.warehouse_name",
        "item_name",
        "description",
        "category",
        "status",
        "quantity"
      )
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

async function deleteOne(req, res) {
  const { id } = req.params;
  try {
    const numDeleted = await knex("inventories").where({ id }).del();

    if (numDeleted > 0) {
      res.sendStatus(204);
    } else {
      res.status(404).send(`Can't find inventory item with id ${id}`)
    }

  } catch (e) {
    res.status(500).json({ e });
  }
}

export { warehouseInventory, allInventory, inventoryItem, post, editOne, deleteOne };
