import express from "express";
import { createOrder, getAllOrders, getClientOrders, getOrderById } from "../controllers/ordersController.js";
import { validateOrder } from "../middlewares/middlewares.js";

const ordersRouter = express.Router();

ordersRouter.post("/order", validateOrder, createOrder);
ordersRouter.get("/orders", getAllOrders);
ordersRouter.get('/orders/:id', getOrderById);
ordersRouter.get('/clients/:id/orders', getClientOrders);

export default ordersRouter;
