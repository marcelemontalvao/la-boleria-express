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

async function getAllOrders(req, res) {
  
    let queryAllOrders = `
      SELECT 
        orders.id AS "orderId", 
        orders.quantity, 
        orders.totalPrice, 
        orders.createdAt, 
        
        cakes.id AS "cakeId", 
        cakes.name, 
        cakes.price, 
        cakes.description, 
        cakes.image, 
        
        clients.id AS "clientId", 
        clients.name, 
        clients.address, 
        clients.phone 
        
      FROM orders 
      JOIN cakes ON orders.cakeId = cakes.id 
      JOIN clients ON orders.clientId = clients.id
    `;
    
    const { date } = req.query;
    
    if (date) {
        queryAllOrders += ` WHERE DATE(orders.createdAt) = '${date}'`;
    }
  
    const result = await db.query(queryAllOrders);
  
    if (result.rows.length === 0) {
      return res.status(404);
    }

    return res.status(200).send(result.rows);
}
  
async function getOrderById(req, res) {
    const { id } = req.params;

    try {
        const queryOrderId = `
            SELECT 
                orders.id AS "orderId", 
                orders.quantity, 
                orders.createdAt, 
                orders.totalPrice, 
                
                clients.id AS "clientId",
                clients.name AS "clientName", 
                clients.address, 
                clients.phone, 
                
                cakes.id AS "cakeId",
                cakes.name AS "cakeName", 
                cakes.price, 
                cakes.description, 
                cakes.image
            FROM 
                orders
            JOIN clients ON orders.clientid = clients.id
            JOIN cakes ON orders.cakeid = cakes.id
            WHERE orders.id = $1 
        `;

        const values = [id];

        const result = await db.query(queryOrderId, values);

        if(result.rowCount === 0) {
            return res.status(404).json({
                message: 'Pedido não encontrado.'
            });
        }

        const order = {
            client: {
                id: result.rows[0].clientId,
                name: result.rows[0].clientName,
                address: result.rows[0].address,
                phone: result.rows[0].phone,
            },
            cake: {
                id: result.rows[0].cakeId,
                name: result.rows[0].cakeName,
                price: result.rows[0].price,
                description: result.rows[0].description,
                image: result.rows[0].image,
            },
            orderId: result.rows[0].orderId,
            createdAt: result.rows[0].createdat,
            quantity: result.rows[0].quantity,
            totalPrice: result.rows[0].totalprice,
        };
    
        res.status(200).json(order);
    } catch (error) {
        internalServerError(error, res);
    }
}

async function getClientOrders(req, res) {
    const { id } = req.params;
    const existingClientSQL = ` 
        SELECT 
            id 
        FROM 
            clients
        WHERE 
            id=$1
    `;

    const existingClient = await db.query(existingClientSQL, [ id ]);

    if(existingClient.rowCount === 0) {
        return res.status(404).send('Não existe um cliente com esse id.');
    }

    const query = `
        SELECT orders.id AS "orderId", 
            orders.quantity, 
            orders.createdAt, 
            orders.totalPrice,
            cakes.name AS "cakeName"
        FROM orders 
        JOIN cakes ON orders.cakeId = cakes.id 
        WHERE orders.clientId = $1
    `;

    try {
        const result = await db.query(query, [id]);
        if(result.rows.length === 0) {
            return res.status(404);
        }

        return res.status(200).send(result.rows);
    } catch (error) {
        internalServerError(error, res);
    }
}

export { createOrder, getAllOrders, getOrderById, getClientOrders };
