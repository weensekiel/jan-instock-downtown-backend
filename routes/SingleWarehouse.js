const knex = require("knex")(require("../knexfile"));

const SingleWarehouse = async (req, res) => {
  try {
    console.log(req.params.warehouseId);
    const warehouseFound = await knex("warehouses").where({ id: req.params.warehouseId });

    if (warehouseFound === 0) {
      return res.status(404).json({ message: `Warehouse with ID ${req.params.warehouseId} not found` });
    }

    const warehouseData = warehouseFound[0];
    res.json(warehouseData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Unable to retrieve warehouse data for warehouse with ID ${req.params.warehouseId},`,
    });
  }
};

module.exports = SingleWarehouse;
