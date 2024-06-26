import express from "express";
import {
  all,
  findOne,
  addWarehouse,
  deleteOne,
  editWarehouse
} from "../controllers/warehouse-controller.js";

const warehousesRouter = express.Router();

warehousesRouter.route("/").get(all);
warehousesRouter.route("/").post(addWarehouse);
warehousesRouter.route("/:id").put(editWarehouse);

warehousesRouter.route("/:id").delete(deleteOne);

warehousesRouter.route("/:id").get(findOne);

export default warehousesRouter;
