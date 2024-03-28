//inventory controllers
import Knex from "knex";
import knexfile from "../knexfile.js";
const knex = Knex(knexfile);

export async function allInventory(req, res) {
    try {
        const allInventory = await knex('inventories')
            .select('inventories.id', 'warehouses.warehouse_name', 'item_name', 'description', 'category', 'status', 'quantity')
            .join('warehouses', 'warehouses.id', 'inventories.warehouse_id')
        res.json(allInventory)
    } catch (err) {
        res.json(err)
    }
}

export async function warehouseInventory(req, res) {
    try {
        const { id } = req.params;
        const inventory = await knex("inventories").where({ warehouse_id: id });
        res.json(inventory);
    } catch (err) {
        res.json({ err });
    }
}