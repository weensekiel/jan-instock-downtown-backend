import express from "express";
import { all, findOne } from "../controllers/warehouse-controller.js";

const warehousesRouter = express.Router();

warehousesRouter.route("/").get(all);

warehousesRouter.route("/:id").get(findOne);

export default warehousesRouter;
