import express from "express";
import {
  all,
  findOne,
  deleteOne,
} from "../controllers/warehouse-controller.js";

const warehousesRouter = express.Router();

warehousesRouter.route("/").get(all);

warehousesRouter.route("/:id").delete(deleteOne);

warehousesRouter.route("/:id").get(findOne);

export default warehousesRouter;
