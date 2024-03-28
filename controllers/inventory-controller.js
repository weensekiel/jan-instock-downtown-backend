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
  }
}

export { post };
