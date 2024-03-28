
import express from "express"

// const knex = require("knex")(require("../knexfile.js"));
import knex from "knex"
import knexFile from "../knexfile.js"

const router = express.Router();

const myknex = knex("../knexfile.js");

router.use(express.json());

// router.get("/", (_req, res) => {
//     res.send("Hello");
// })

router.post("/api/warehouses", async (req, res) => {
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

        res.status(201).json({id, warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email});
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

export default router;