const knex = require('knex')(require('../knexfile'));
const express = require('express')

const inventoryRouter = express.Router()

//get inventory for single warehouse
inventoryRouter.get("/warehouses/:id/inventory", async (req, res) => {
    try {
        const {id} = req.params
        const inventory = await knex("inventories").where({warehouse_id : id })
        res.json(inventory)
    }catch(err){
        res.json({err})
    }
})

module.exports = {inventoryRouter}