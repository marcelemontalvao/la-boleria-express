import express from "express";
import { createOrder } from "../controllers/ordersController.js";
import { validateOrder } from "../middlewares/middlewares.js";

const ordersRouter = express.Router();

ordersRouter.post("/order", validateOrder, createOrder);

export default ordersRouter;