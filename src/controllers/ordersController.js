import db from "../configs/db.js";
import { internalServerError } from "../middlewares/middlewares.js";

async function createOrder(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body;
    const createdAt = new Date();

    const order = [clientId, cakeId, quantity, totalPrice, createdAt];
    const orderSQL = `
        INSERT INTO
            orders (clientId, cakeId, quantity, totalPrice, createdAt)
        VALUES
            ($1, $2, $3, $4, $5)
    `;

    try {
        await db.query(orderSQL, order);
        return res.sendStatus(201);
    } catch (error) {
        internalServerError(error, res);
    }
}

export { createOrder }